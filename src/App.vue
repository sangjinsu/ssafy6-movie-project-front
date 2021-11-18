<template>
  <div id="app">
    <movie-nav v-if="isLogin"></movie-nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MovieNav from "@/components/layout/MovieNav";

export default {
  name: "App",
  components: {
    MovieNav,
  },
  computed: {
    ...mapGetters(["isLogin"]),
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
</style>
