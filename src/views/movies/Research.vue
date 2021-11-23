<template>
  <b-container>
    <div class="fw-bold text-start text-white">
      <h1>Genre</h1>
    </div>
    <v-select class="style-chooser rounded bg-light text-dark border border-5 border-white fw-bold m-5" v-model="selected" :options="options"></v-select>
    <transition-group name="list" tag="div">
      <div class="pb-3" v-for="movieList in movieLists" :key="movieList">
        <movie-image-list :movieList="movieList"></movie-image-list>
      </div>
    </transition-group>
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
        { label: "최신", id: 100 },
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
      if(genres === 100){
        this.genreMovies = this.getTopMoviesList
        return 
      }
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
