<template>
  <div id="app">
    <div id="nav">
      <span v-if="!isLogin">
        <router-link to="/"></router-link>
      </span>
      <span v-else>
        <router-link to="movies/"></router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "App",
  data: function () {
    return {
      ...mapGetters(['isLogin'])
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
