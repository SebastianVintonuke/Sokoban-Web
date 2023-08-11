<template>
  <div class='ranking'>
    <div class='ranking-item'>
      <div class='ranking-player-item'> Position </div>
      <div class='ranking-player-item'> User </div>
      <div class='ranking-player-item'> Max Level </div>
      <div class='ranking-player-item'> Time </div>
    </div>
    <div class='hr'></div>
    <div v-for='(player, index) in players' :key='index'>
      <div class='ranking-item'>
        <div class='ranking-player-item'> {{ getPosition(player) }} </div>
        <div class='ranking-player-item'> {{ getName(player) }} </div>
        <div class='ranking-player-item'> {{ getMaxLevel(player) }} </div>
        <div class='ranking-player-item'> {{ getTime(player) }} </div>
      </div>
    </div>
  </div>
</template>

<script scoped lang='ts'>
import { Vue } from 'vue-class-component'
import { getRanking as backendPlaceholderGetRanking } from '../backendPlaceholder';
import { Player } from '../backendPlaceholder/types';


export default class Ranking extends Vue {
  public players: Player[] = [{ id: 'unknown', name: 'NotFoundPlayer', maxLevel: 0, time: 0 }];

  private sortPlayers(players: Player[]): Player[] {
    return players.sort((p1, p2) => {
      if (p1.maxLevel > p2.maxLevel || (p1.maxLevel === p2.maxLevel && p1.time < p2.time)) {
        return -1;
      }
      if (p1.maxLevel < p2.maxLevel || (p1.maxLevel === p2.maxLevel && p1.time > p2.time)) {
        return 1;
      }
      return 0;
    });
  }

  public getPosition(player: Player): number {
    return this.players.indexOf(player) + 1;
  }

  public getName(player: Player): string {
    return player.name;
  }

  public getMaxLevel(player: Player): number | string {
    return player.maxLevel;
  }

  public getTime(player: Player): string {
    const milliseconds = new Date(player.time).getTime();
    const seconds = Math.round((milliseconds / 1000) % 60);
    const minutes = Math.round((milliseconds / (1000 * 60)) % 60);
    const hour = Math.round((milliseconds / (1000 * 60 * 60)) % 24);
    return `${hour}h ${minutes}m ${seconds}s`;
  }

  private async getRanking(): Promise<void> {
      backendPlaceholderGetRanking().then(res => this.players = this.sortPlayers(res));
  }

  public created(): void {
    this.getRanking();
  }
}
</script>

<style scoped>
.ranking {
  width: 90vw;
  background-color: #222;
  padding: 1%;
}
.hr {
  border: 1px solid #fff;
  margin-bottom: 1%;
}
.ranking-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 0.4%;
  padding-bottom: 0.4%;
}
.ranking-player-item {
  text-align: center;
  color: #fff;
}
</style>
