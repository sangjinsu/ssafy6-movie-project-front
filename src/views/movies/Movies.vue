<template>
  <b-container v-if="isLoading">
    <div class="mb-5">
      <top-movie-image-list :movieList="threeTopMovies"></top-movie-image-list>
    </div>

    <div class="mb-5">
      <p class="fs-3 text-start fw-bold text-white">최신 영화</p>
      <movie-image-list
        v-for="(lastestMovieList, index) in lastestMovieLists"
        :key="index"
        :movieList="lastestMovieList"
      ></movie-image-list>
    </div>

    <div class="mb-5">
      <p class="fs-3 text-start fw-bold text-white">찜한 영화</p>
      <div v-if="pickMovies.length > 0">
        <movie-image-list :movieList="pickMovies"></movie-image-list>
      </div>
      <div v-else>
        <p class="fs-3 text-start fw-bold text-white">
          보고 싶은 영화를 찜해주세요!
        </p>
      </div>
    </div>

    <div class="mb-5">
      <p class="fs-3 text-start fw-bold text-white">좋아요한 영화</p>
      <div v-if="likeMovies.length > 0">
        <movie-image-list :movieList="likeMovies"></movie-image-list>s
      </div>
      <div v-else>
        <p class="fs-3 text-start fw-bold text-white">영화 안 좋아하시나요?</p>
      </div>
    </div>

    <div class="mb-5">
      <p class="fs-3 text-start fw-bold text-white">인기 영화</p>
      <movie-image-list
        v-for="(topMovieList, index) in topMovieLists"
        :key="index"
        :movieList="topMovieList"
      ></movie-image-list>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import _ from "lodash";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Movies",
  components: {
    MovieImageList: () => import("@/components/MovieImageList.vue"),
    TopMovieImageList: () => import("@/components/TopMovieImageList.vue"),
  },
  data() {
    return {
      likeMovies: [],
      pickMovies: [],
    };
  },
  computed: {
    ...mapGetters(["getLastestMovies", "getTopMovies"]),
    lastestMovieLists() {
      return _.chunk(this.getLastestMovies, 15);
    },
    topMovieLists() {
      return _.chunk(this.getTopMovies, 15);
    },
    threeTopMovies() {
      if (this.getTopMovies) {
        return [...this.getTopMovies].slice(0, 3);
      }
      return [];
    },
    isLoading() {
      if (
        this.$store.state.lastestMovies !== null &&
        this.$store.state.topMovies !== null &&
        this.threeTopMovies.length > 0
      ) {
        return true;
      }
      return false;
    },
  },
  created() {
    if (this.$store.state.lastestMovies === null) {
      this.$store.dispatch("getLastestMovies");
    }
    if (this.$store.state.topMovies === null) {
      this.$store.dispatch("getTopMovies");
    }

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

<style scoped></style>
