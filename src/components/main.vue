<template>
  <div class='main'>
    <h1 class='main-title main-jp-title-g'>倉</h1>
    <h1 class='main-title main-jp-title-p'>庫</h1>
    <h1 class='main-title main-jp-title-w'>番</h1>
    <h1 class='main-title main-title-g'>SO</h1>
    <h1 class='main-title main-title-p'>KO</h1>
    <h1 class='main-title main-title-w'>BAN</h1>
    <p class='main-text'>
      {{$t('MAIN.DESCRIPTION')}}
    </p>
    <router-link class='main-button main-button-g' to='/userConfig'> {{$t('MAIN.PLAY')}} </router-link>
    <router-link class='main-button main-button-v' to='/ranking'> {{$t('MAIN.RANKING')}} </router-link>
  </div>
</template>

<script scoped lang='ts'>
</script>

<style scoped>
.main {
  width: 90vw;
  background-color: #222;
  padding: 5%;
  color: #fff;
}
.main-title {
  font-size: 40px;
  letter-spacing: 5px;
}
.main-jp-title-g {
  color: #32ed43;
  float: left;
}
.main-jp-title-p {
  color: #8059d4;
  float: left;
}
.main-jp-title-w {
  color: #fff;
}
.main-title-g {
  color: #32ed43;
  float: left;
  font-weight: bold;
}
.main-title-p {
  color: #8059d4;
  float: left;
  font-weight: bold;
}
.main-title-w {
  color: #fff;
  font-weight: bold;
}
.main-text {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  margin-bottom: 25px;
}
.main-button {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 18px;
  font-weight: bold;
  background-color: #222;
  border: 2px solid #fff;
  letter-spacing: 2px;
  padding-top: 7px;
  padding-bottom: 9px;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: 7px;
  text-decoration: none;
}
.main-button-g:hover {
  color: #32ed43;
  border: 2px solid #32ed43;
}
.main-button-v:hover {
  color: #8059d4;
  border: 2px solid #8059d4;
}
</style>
