<template>
  <div class='userConfig'>
    <div class='userConfig-container'>
      <form>
        <input type='text' pattern='^[a-zA-Z0-9\-_]*$' @keyup='typing'>
        <router-link v-if='isUserNameValid' :class="'userConfig-router-link ' + `${isUserNameValid ? '' : 'invalid'}`" :to="getPlayerLink()"> PLAY </router-link>
        <a v-else class='userConfig-router-link invalid' :disabled='true'> PLAY </a>
      </form>
      <p>
        ➤ Choose the name you want to appear in the ranking.
        <br>
        ➤ Complete as many levels as possible in the shortest amount of time.
      </p>
    </div>
  </div>
</template>

<script scoped lang='ts'>
import { Vue } from 'vue-class-component'

export default class UserConfig extends Vue {
  private userName: string = '';

  public validUserName = /^[a-zA-Z0-9\-_]*$/;

  public typing(e: KeyboardEvent): void {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.value.length < 11) {
      this.userName = inputElement.value;
    }
  }

  public getPlayerLink(): string {
    if (this.userName === '') {
      return '/game/unknown';
    }
    return '/game/' + this.userName;
  }

  get isUserNameValid(): boolean {
    return this.validUserName.test(this.userName);
  }
}
</script>

<style scoped>
.userConfig {
  width: 90vw;
  background-color: #222;
  padding: 1%;
}

.userConfig-container {
  text-align: center;
  border: 2px solid #fff;
  padding-top: 10vh;
  padding-bottom: 10vh;
}

.userConfig-container p {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  letter-spacing: 8px;
}

.userConfig-container form {
  margin-bottom: 2vh;
}

.userConfig-container input {
  border: 2px solid #fff;
  background-color: #333;
  color: #fff;
  margin-right: 0.5vw;
  padding-top: 6px;
  padding-bottom: 6px;
}

.userConfig-router-link {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
  font-weight: bold;
  background-color: #222;
  border: 2px solid #fff;
  letter-spacing: 2px;
  padding-top: 7px;
  padding-bottom: 9px;
  padding-right: 25px;
  padding-left: 20px;
  margin-right: 7px;
  text-decoration: none;
  white-space: nowrap;
}
.userConfig-router-link:hover {
  color: #32ed43;
  border: 2px solid #32ed43;
}

.userConfig-router-link.invalid {
  color: #e31f0e;
  border: 2px solid #e31f0e;
  cursor: default;
}
</style>
