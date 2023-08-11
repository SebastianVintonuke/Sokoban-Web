<template>
  <div class='navigation'>
    <div class='navigation-container'>
      <router-link class='navigation-router-link' to='/'> <a>Home</a> </router-link> |
      <router-link class='navigation-router-link' to='/userConfig'> <a>Game</a> </router-link> |
      <router-link class='navigation-router-link' to='/ranking'> <a>Ranking</a> </router-link>
    </div>
  </div>
</template>

<script scoped lang='ts'>
</script>

<style scoped>
  .navigation {
    background-color: #222;
    color: #fff;
  }
  .navigation-container {
    padding-left: 4%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
  .navigation-router-link {
    font-family: 'Raleway', sans-serif;
    color: #fff;
    padding-right: 1%;
    padding-left: 1%;
    text-decoration: none;
    font-size: 18px;
    letter-spacing: 3px;
  }
  .navigation-router-link:hover {
    color: #fff;
  }
  .navigation-router-link a:hover {
    border-bottom: 1px solid #fff;
  }
</style>
