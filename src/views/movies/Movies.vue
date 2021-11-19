<template>
  <div>
    <div
      v-for="(movieList, index) in movieLists"
      :key="index"
      class="d-flex justify-content-center"
    >
      <movie-image v-for="movie in movieList" :key="movie.id" :movie="movie">
      </movie-image>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieImage from "@/components/MovieImage.vue";
import { mapGetters } from "vuex";

export default {
  name: "Movies",
  components: {
    MovieImage,
  },
  data() {
    return {
      topMovies: null,
      likeMovies: null,
      pickMovies: null,
    };
  },
  computed: {
    movieLists() {
      return [
        this.topMovies,
        this.getLastestMovies,
        this.likeMovies,
        this.pickMovies,
      ];
    },
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
