export type Level = {
    number: number,
    title: string,
    description: LevelDescription,
    creator: string
}

export type LevelDescription = Array<String>;

export type Coordenada = 'NORTE' | 'OESTE' | 'SUR' | 'ESTE';

export type Direccion = [0, -1] | [-1, 0] | [0, 1] | [1, 0];

export type Grilla = Array<Array<string>>;

export type Historial = Array<Grilla>;

export type Player = {
    id: string,
    name: string,
    maxLevel: number,
    time: number,
}

export type PlayerForDB = Omit<Player, 'id'>;