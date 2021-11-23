<template>
  <b-container>
    <div class="fw-bold text-start text-white my-5">
      <h1>Recommend for U</h1>
    </div>

    <div class="mb-5">
      <div class="fw-bold text-start text-white">
        <h3>비슷한 취향을 가진 사람들이 본 영화</h3>
      </div>
      <div v-if="isLoadingByUsers" class="fw-bold text-start text-white">
        <h4>다른 사람들은 무엇을 보았을까요? <div class="spinner-border" role="status"></div></h4>
      </div>
      <div v-else-if="recommendMovieListsByUsers.length > 0">
        <movie-image-list v-for="(recommendMovieListByUsers, index) in recommendMovieListsByUsers" :key="index" :movieList="recommendMovieListByUsers"></movie-image-list>
      </div>
      <div v-else class="fw-bold text-start text-white">
        <h4>아쉽네요. 추천 영화가 없어요. 흔치 않은 취향을 가졌군요</h4>
      </div>
    </div>

    <div class="mb-5">
      <div class="fw-bold text-start text-white">
        <h3>{{getUserName}} 님 취향에 맞는 영화</h3>
      </div>
        <div v-if="isLoadingByReviews" class="fw-bold text-start text-white">
          <h4>기다리세요. 영화를 찾고 있어요 <div class="spinner-border" role="status"></div></h4>
        </div>
        <div v-else-if="recommendMovieListsByReviews.length > 0">
          <movie-image-list  v-for="(recommendMovieListByReview, index) in recommendMovieListsByReviews" :key="index" :movieList="recommendMovieListByReview"></movie-image-list>
        </div>
        <div v-else class="fw-bold text-start text-white">
          <h4>리뷰나 좋아요가 있어야 추천할 수 있어요</h4>
        </div>
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
  name: "Recommend",
  components: {
    MovieImageList,
  },
  data() {
    return {
      recommendMovieByUsers: [],
      recommendMovieByReviews: [],
      isLoadingByUsers : true, 
      isLoadingByReviews: true,
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
        this.isLoadingByUsers = false
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
        this.isLoadingByReviews = false
        this.recommendMovieByReviews = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
