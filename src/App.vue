<template>
  <div id="app">
    <Navigation/>
    <div class="app-background">
        <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Navigation from './components/navigation.vue';
import Footer from './components/footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer
  }
}
</script>

<style scoped>
.app-background {
  padding-top: 10vh;
  padding-bottom: 10vh;
  min-height: 60vh;
  background-color: #8059d4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2331ed40' fill-opacity='0.68' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
