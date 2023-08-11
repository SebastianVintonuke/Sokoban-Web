<template>
  <footer class='footer'>
    <div class='footer_container'>
      <div>
        <h2> Contacto </h2>
        <li><a href='https://www.linkedin.com/in/sebastian-vintoñuke' target='_blank'> LINKEDIN </a></li>
        <li><a href='https://github.com/SebastianVintonuke' target='_blank'> GITHUB </a></li>
        <li><a href='https://sebastianvintonuke.github.io/MyPortfolio' target='_blank'> PORTFOLIO </a></li>
      </div>
      <div>
        <p> Argentina </p>
        <p> Buenos Aires </p>
        <p> Sebastian M. Vintoñuke </p>
      </div>
    </div>
  </footer>
</template>

<script lang='ts'>
</script>

<style scoped>
.footer {
  background-color: #222;
  width: 100%;
}

.footer_container {
  padding: 0.5%;
  padding-left: 5%;
}

.footer_container div {
  padding-top: 35px;
}

.footer_container div h2 {
  color: #777;
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  letter-spacing: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.footer_container li {
  list-style: none;
  padding-top: 4px;
  padding-bottom: 4px;
}

.footer_container li a {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.footer_container li a:hover {
  border-bottom: 1px solid #fff;
  padding-bottom: 0px;
}

.footer_container p {
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  letter-spacing: 8px;
  user-select: none;
}

.footer_container p:nth-child(2) {
  font-weight: bold;
  user-select: none;
}

.footer_container p:nth-child(3) {
  font-size: 15px;
  color: #777;
  user-select: none;
}
</style>
