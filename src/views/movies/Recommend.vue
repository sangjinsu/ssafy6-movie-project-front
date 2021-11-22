<template>
  <b-container>
    <h1>추천 영화</h1>
    <h3>비슷한 취향을 가진 사람들이 본 영화</h3>
    <movie-image-list v-for="(recommendMovieListByUsers, index) in recommendMovieListsByUsers" :key="index" :movieList="recommendMovieListByUsers"></movie-image-list>
    <h3>{{getUserName}} 님 취향에 맞는 영화</h3>
    <movie-image-list v-for="(recommendMovieListByReview, index) in recommendMovieListsByReviews" :key="index" :movieList="recommendMovieListByReview"></movie-image-list>
  </b-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import MovieImageList from "@/components/MovieImageList.vue";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Recommend",
  components: {
    MovieImageList,
  },
  data() {
    return {
      recommendMovieByUsers: null,
      recommendMovieByReviews: null,
    };
  },
  computed: {
    ...mapGetters(['getUserName']),
    recommendMovieListsByReviews(){
        return  _.chunk(this.recommendMovieByReviews, 15);
    },
    recommendMovieListsByUsers(){
        return  _.chunk(this.recommendMovieByUsers, 15);
    }
  },
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/recommend/users`,
    }) 
      .then((res) => {
        this.recommendMovieByUsers = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/recommend/reviews`,
    }) 
      .then((res) => {
        this.recommendMovieByReviews = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style></style>
