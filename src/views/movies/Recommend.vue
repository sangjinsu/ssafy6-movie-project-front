<template>
  <b-container>
    <div class="fw-bold text-start text-white mb-5">
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

    <div class="mb-5">
      <div class="fw-bold text-start text-white">
        <h3>트렌디한 윤성빈 개발자가 재밌게 본 영화</h3>
      </div>
        <div v-if="isLoadingByMD" class="fw-bold text-start text-white">
          <h4>트렌디함은 이분을 못 따라가요!<div class="spinner-border" role="status"></div></h4>
        </div>
        <div v-else>
          <movie-image-list  v-for="(recommendMovieListByYun, index) in recommendMovieListsByYun" :key="index" :movieList="recommendMovieListByYun"></movie-image-list>
        </div>
    </div>

    <div class="mb-5">
      <div class="fw-bold text-start text-white">
        <h3>연말에 뭐하지? 상진수 개발자가 고민한 영화</h3>
      </div>
        <div v-if="isLoadingByMD" class="fw-bold text-start text-white">
          <h4>연말에 코딩말고 영화나 볼까..<div class="spinner-border" role="status"></div></h4>
        </div>
        <div v-else>
          <movie-image-list  v-for="(recommendMovieListBySang, index) in recommendMovieListsBySang" :key="index" :movieList="recommendMovieListBySang"></movie-image-list>
        </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Recommend",
  components: {
    MovieImageList: () => import("@/components/MovieImageList.vue"),
  },
  data() {
    return {
      recommendMovieByUsers: [],
      recommendMovieByReviews: [],
      recommendMovieByYun: [],
      recommendMovieBySang: [],
      isLoadingByUsers : true, 
      isLoadingByReviews: true,
      isLoadingByMD: true,
    };
  },
  computed: {
    ...mapGetters(['getUserName']),
    recommendMovieListsByReviews(){
        return  _.chunk(this.recommendMovieByReviews, 15);
    },
    recommendMovieListsByUsers(){
        return  _.chunk(this.recommendMovieByUsers, 15);
    },
    recommendMovieListsByYun(){
      return _.chunk(this.recommendMovieByYun, 15)
    },
    recommendMovieListsBySang(){
      return _.chunk(this.recommendMovieBySang, 15)
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

    axios({
      method: "get",
      url: `${SERVER_URL}/movies/recommend/md`,
    }) 
      .then((res) => {
        this.isLoadingByMD = false
        this.recommendMovieByYun = res.data.yun
        this.recommendMovieBySang = res.data.sang
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
</style>
