<template>
  <div id="app">
    <movie-nav v-if="isLogin"></movie-nav>
    <div class="pt-5 mt-5">
      <router-view />
    </div>
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
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
body {
  font-family: "Noto Sans KR", sans-serif;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
