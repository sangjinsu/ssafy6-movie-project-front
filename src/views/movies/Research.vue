<template>
  <b-container>
    <v-select v-model="selected" :options="options"></v-select>
    <div v-for="(movieList, index) in movieLists" :key="index">
      <movie-image-list :movieList="movieList"></movie-image-list>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import MovieImageList from "@/components/MovieImageList.vue";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Research",
  components: {
    MovieImageList,
  },
  data: function () {
    return {
      genreMovies: null,
      selected: "장르",
      options: [
        { label: "액션", id: 28 },
        { label: "모험", id: 12 },
        { label: "코미디", id: 35},
        { label: "애니메이션", id: 16 },
        { label: "범죄", id: 80 },
        { label: "다큐멘터리", id: 99 },
        { label: "드라마", id: 18 },
        { label: "가족", id: 10751 },
        { label: "판타지", id: 14 },
        { label: "역사", id: 36 },
        { label: "공포", id: 27 },
        { label: "음악", id: 10402 },
        { label: "미스터리", id: 9648 },
        { label: "로맨스", id: 10749 },
        { label: "SF", id: 878 },
        { label: "TV 영화", id: 10770 },
        { label: "스릴러", id: 53 },
        { label: "전쟁", id: 10752 },
        { label: "서부", id: 37 },
      ],
    };
  },
  created(){
    if (this.getTopMoviesList === null){
      this.$store.dispatch('getTopMovies')
    }
  },
  computed: {
    ...mapGetters(["getTopMoviesList"]),
    movies(){
      if (this.genreMovies === null){
        return this.getTopMoviesList
      }
      return this.genreMovies
    },
    movieLists() {
      return _.chunk(this.movies, 15);
    },
  },
  watch: {
    selected() {
      this.research(this.selected.id);
    },
  },
  methods: {
    research(genres) {
      axios({
        method: "get",
        url: `${SERVER_URL}/movies/${genres}/genres/`,
      })
        .then((res) => {
          this.genreMovies = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
