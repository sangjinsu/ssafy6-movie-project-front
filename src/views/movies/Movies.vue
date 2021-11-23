<template>
  <div style="color: white">
    <b-container>
      <div class="card-0">
        <top-movie-image-list :movieList="getTopMovies"></top-movie-image-list>
      </div>

      <div class="card-1">
        <h2>최신 영화</h2>
        <movie-image-list
          v-for="(lastestMovieList, index) in lastestMovieLists"
          :key="index"
          :movieList="lastestMovieList"
        ></movie-image-list>
      </div>
      <div class="card-2">
        <h2>찜한 영화</h2>
        <movie-image-list :movieList="pickMovies"></movie-image-list>
      </div>

      <div class="card-3">
        <h2>좋아요한 영화</h2>
        <movie-image-list :movieList="likeMovies"></movie-image-list>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import MovieImageList from "@/components/MovieImageList.vue";
import TopMovieImageList from "@/components/TopMovieImageList.vue";
import { mapGetters } from "vuex";
import _ from "lodash";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Movies",
  components: {
    MovieImageList,
    TopMovieImageList,
  },
  data() {
    return {
      likeMovies: null,
      pickMovies: null,
    };
  },
  computed: {
    ...mapGetters(["getLastestMovies", "getTopMovies"]),
    lastestMovieLists() {
      return _.chunk(this.getLastestMovies, 15);
    },
  },
  created() {
    this.$store.dispatch("getTopMovies");
    this.$store.dispatch("getLastestMovies");

    axios({
      method: "get",
      url: `${SERVER_URL}/movies/like`,
    })
      .then((res) => {
        this.likeMovies = res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    axios({
      method: "get",
      url: `${SERVER_URL}/movies/pick`,
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

<style scoped>
.card-0 {
  margin: 3vw 0;
}
.card-1 {
  margin: 3vw 0;
}
.card-2 {
  margin: 3vw 0;
}
.card-3 {
  margin: 3vw 0;
}
</style>
