<template>
  <b-container>
      <top-movie-image-list :movieList="topMovies"></top-movie-image-list>
      <movie-image-list :movieList="getLastestMovies"></movie-image-list>
      <movie-image-list :movieList="likeMovies"></movie-image-list>
      <movie-image-list :movieList="pickMovies"></movie-image-list>
  </b-container>
</template>

<script>
import axios from "axios";
import MovieImageList from "@/components/MovieImageList.vue";
import TopMovieImageList from "@/components/TopMovieImageList.vue";
import { mapGetters } from "vuex";

export default {
  name: "Movies",
  components: {
   MovieImageList, TopMovieImageList
  },
  data() {
    return {
      topMovies: null,
      likeMovies: null,
      pickMovies: null,
    };
  },
  computed: {
    ...mapGetters(["getLastestMovies"]),
  },
  created() {
    this.$store.dispatch("getLastestMovies");
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/movies/top",
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        this.topMovies = res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    this.$store.dispatch("getLastestMovies");

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/movies/like",
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        this.likeMovies = res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/movies/pick",
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        this.pickMovies = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style></style>
