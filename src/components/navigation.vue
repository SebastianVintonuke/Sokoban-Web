<template>
  <div class='navigation'>
    <div class='navigation-container'>
      <router-link class='navigation-router-link' to='/'> <a>{{$t('NAVIGATION.HOME')}}</a> </router-link> |
      <router-link class='navigation-router-link' to='/userConfig'> <a>{{$t('NAVIGATION.GAME')}}</a> </router-link> |
      <router-link class='navigation-router-link' to='/ranking'> <a>{{$t('NAVIGATION.RANKING')}}</a> </router-link>
    </div>
    <div class='languaje-container'>
      <button type='button' class='lenguaje-button' v-on:click='changeLanguage(en)'>EN</button>
      <button type='button' class='lenguaje-button' v-on:click='changeLanguage(es)'>ES</button>
      <button type='button' class='lenguaje-button' v-on:click='changeLanguage(jp)'>JP</button>
    </div>
  </div>
</template>

<script scoped lang='ts'>
import { Vue } from 'vue-class-component'

export default class Navigation extends Vue {
  public en = 'en';
  public es = 'es';
  public jp = 'jp';

  public changeLanguage(lang: string): void {
    this.$i18n.locale = lang;
  }

}
</script>

<style scoped>
  .navigation {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #222;
    color: #fff;
  }
  .navigation-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-right: 4%;
    padding-left: 4%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  .languaje-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-right: 4%;
    padding-left: 5.5%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  .navigation-router-link {
    font-family: 'Raleway', sans-serif;
    color: #fff;
    padding-right: 4%;
    padding-left: 4%;
    text-decoration: none;
    font-size: 18px;
    letter-spacing: 3px;
  }
  .navigation-router-link:hover {
    color: #fff;
  }

  .navigation-router-link a {
    white-space: nowrap;
  }
  .navigation-router-link a:hover {
    border-bottom: 1px solid #fff;
  }
  .lenguaje-button {
    float: right;
    font-family: 'Raleway', sans-serif;
    color: #fff;
    padding-right: 4%;
    padding-left: 4%;
    text-decoration: none;
    font-size: 18px;
    letter-spacing: 3px;
    background: none;
    border: none;
    white-space: nowrap;
  }
</style>
