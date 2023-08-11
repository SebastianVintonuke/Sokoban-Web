<template>
  <div class='main'>
    <h1 class='main-title main-jp-title-g'>倉</h1>
    <h1 class='main-title main-jp-title-p'>庫</h1>
    <h1 class='main-title main-jp-title-w'>番</h1>
    <h1 class='main-title main-title-g'>SO</h1>
    <h1 class='main-title main-title-p'>KO</h1>
    <h1 class='main-title main-title-w'>BAN</h1>
    <p class='main-text'>
      Sokoban is a classic puzzle game invented in Japan, usually implemented as a video game. The original game was created by Hiroyuki Imabayashi, who in 1980 won a competition against a computer with his game. Hiroyuki Imabayashi is president of Thinking Rabbit Inc. in Japan. Over the years, many versions of the game have appeared for all platforms, and new collections of levels are created all the time. Sokoban means 'warehouse keeper' in Japanese. The objective of the game is to push the boxes to their correct place inside a small warehouse, with the minimum number of pushes and steps. Boxes can only be pushed, not pulled, and only one box can be pushed at a time. It sounds easy, but the levels range from very easy to extremely difficult, with some taking hours or even days to solve. The simplicity and elegance of the rules have made Sokoban one of the most popular puzzle games.
    </p>
    <router-link class='main-button main-button-g' to='/userConfig'> Play </router-link>
    <router-link class='main-button main-button-v' to='/ranking'> Ranking </router-link>
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
