import { LEVELS } from './Levels';
import { collection, doc, deleteDoc, addDoc, getDocs } from 'firebase/firestore';
import { DB } from './firebase';
import { Player, Level, LevelDescription, PlayerForDB } from './types'

async function getUsers(): Promise<Player[]> {
  const usersColl = collection(DB, 'users');
  const usersSnapshot = await getDocs(usersColl);
  const usersList = usersSnapshot.docs.map(doc => {
    const docWithId = doc.data();
    docWithId.id = doc.id;
    return docWithId;
  });
  const userTyped = usersList.map(user => ({
    id: user.id,
    name: user.name,
    maxLevel: user.maxLevel,
    time: user.time
  }));
  return userTyped;
}

async function saveUser(newUser: PlayerForDB) {
  await addDoc(collection(DB, 'users'), newUser);
}

async function deleteUserById(id: string) {
  await deleteDoc(doc(DB, 'users', id));
}

function getUserWithName(users: Array<Player>, searchedName: string) {
  /* recibe una lista de usuarios y un nombre, devuelve el usuario con ese nombre */
  return users.find(i => i.name === searchedName);
}

export async function getRanking(): Promise<Player[]> {
  /* Envia todos los usuarios en el ranking */
  const users = await getUsers();
  return users;
}

export async function updateRanking(name: string, maxLevel: number, time: number): Promise<void> {
  /* Recibe un jugador con un nombre un nivel y un tiempo.
     Si el nombre ya se encuentra en el ranking solo lo actualiza si mejoro su puesto.
     Si no se encuentra en el ranking y hay menos de 100 personas, lo agrega.
     Si no se encuentra en el ranking, ya hay 100 personas y es mejor que el ultimo, lo agrega y quita al ultimo */
  const newUser = {name, maxLevel, time};
  const users = await getUsers();
  const lastRankSameUser = getUserWithName(users, name);
  if (lastRankSameUser != null) {
    if (comparePlayers(newUser, lastRankSameUser) == -1) {
      await deleteUserById(lastRankSameUser.id);
      await saveUser(newUser);
    }
  } else if (users.length < 10) {
    await saveUser(newUser);
  } else {
    const lastUser = getLastUser(users);
    if (comparePlayers(newUser, lastUser) == -1) {
      await deleteUserById(lastUser.id);
      await saveUser(newUser);
    }
  }
}

export function getLevel(numberLevel: number): Level {
  /* Envia el nivel solicitado, si no esta el nivel (se terminaron), envia un nivel aleatorio girado horizontal o verticalmente o ambas */
  const level = findLevelByNumber(LEVELS, numberLevel);
  if (level == null) {
    const title = "Randomized";
    const description = randomizeLevel(randomLevel());
    const creator = "";
    const newLevel = { number: numberLevel, title, description, creator };
    return newLevel;
  }
  return level;
}

//-----------------------

function findLevelByNumber(levels: Array<Level>, searchedNumber: number): Level | undefined {
  /* Busca un nivel por su numero */
  return levels.find(level => level.number === searchedNumber);
}

function randomLevel(): LevelDescription {
  /* Devuelve una descripción de un nivel pseudoaleatorio entre el 1 y el 155 */
  const number = Math.floor((Math.random() * (155-1)) + 1);
  const level = findLevelByNumber(LEVELS, number);
  if (!level) {
    throw new Error('Deberia existir un nivel entre 1 y 155');
  }
  return level.description
}

function randomizeLevel(level: LevelDescription): LevelDescription {
  /* Recibe una descripcion de un nivel y devuelve una variante */
  let variacion = false;
  if (Math.floor(Math.random()*2) == 1) {
    variacion = true;
    level = horizontalReverse(level);
  } else if (variacion == false || (Math.floor(Math.random()*2) == 1)) {
    level = verticalReverse(level);
  }
  return level
}

function horizontalReverse(level: LevelDescription): LevelDescription {
  /* Recibe una descripción de un nivel y lo devulve invertido horizontalmente */
  for (let i = 0; i < level.length; i++) {
    level[i] = level[i].split("").reverse().join("");
  }
  return level
}

function verticalReverse(level: LevelDescription): LevelDescription {
  /* Recibe una descripción de un nivel y lo devulve invertido verticalmente */
  return level.reverse()
}

function getLastUser(users: Player[]) {
  /* Recibe un array de usuarios desordenado, devuelve el usuario con la peor posición */
  let minLevel = users[0].maxLevel;
  for (let i = 0; i < users.length; i++) {
    if (users[i].maxLevel < minLevel) {
      minLevel = users[i].maxLevel
    }
  }
  const minLevelArray = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].maxLevel == minLevel) {
      minLevelArray.push(users[i]);
    }
  }
  let lastUser = minLevelArray[0];
  let maxTime = minLevelArray[0].time;
  for (let i = 0; i < minLevelArray.length; i++) {
    if (minLevelArray[i].time > maxTime) {
      maxTime = minLevelArray[i].time;
      lastUser = minLevelArray[i];
    }
  }
  return lastUser
}

function comparePlayers(p1: PlayerForDB, p2: PlayerForDB) {
  /* Funcion de comparacion entre usuarios.
     Un usuario es mayor que otro si tiene mas niveles o si tiene los mismos niveles en un menor tiempo */
  if (( p1.maxLevel > p2.maxLevel ) || ((p1.maxLevel == p2.maxLevel) && (p1.time < p2.time) )) {
    return -1;
  }
  if (( p1.maxLevel < p2.maxLevel ) || ((p1.maxLevel == p2.maxLevel) && (p1.time > p2.time) )) {
    return 1;
  }
  return 0;
}