<template>
  <div id="app">
    <default-nav v-on:apply="replaceUrl"></default-nav>
    <router-view/>
  </div>
</template>

<script>
import DefaultNav from '@/components/DefaultNav'

export default {
  name: 'app',
  components: {
    DefaultNav
  },
  methods: {
    replaceUrl (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 20px;
}
</style>
