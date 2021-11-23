
<template>
  <b-container v-if="profile">  

    <div class="mx-5">
      <div class="fw-bold text-start text-white my-5">
        <h1>{{profile.username}}님의 프로필</h1>
      </div>
      <div class="fw-bold text-end text-white">
        <h4>리뷰 {{profile.reviews.length}}개</h4>
        <h4>댓글 {{profile.comments.length}}개</h4>
        <h4>찜한 영화 {{profile.pick_movies.length}}개</h4>
        <h4>좋아요한 영화 {{profile.like_movies.length}}개</h4>
      </div>
    </div>

    
    <div class="my-5">
      <div class="fw-bold text-start text-white mx-5">
        <h4>찜한 영화</h4>
      </div>
      <div v-if="pickMovieLists.length">
        <ul>
          <movie-image-list v-for="(pickMovieList, index) in pickMovieLists" :key="index" :movieList="pickMovieList"></movie-image-list>
        </ul>
      </div>
      <div v-else class="fw-bold text-start text-white mx-5">
        <h4>이런, 보고 싶은 영화가 없으신가요?</h4>
      </div>
    </div>  
    
    <div class="mb-5">
      <div class="fw-bold text-start text-white mx-5">
        <h4>좋아요한 영화</h4>
      </div>
      <div v-if="likeMovieLists.length">
        <ul>
          <movie-image-list v-for="(likeMovieList, index) in likeMovieLists" :key="index" :movieList="likeMovieList"></movie-image-list>
        </ul>
      </div>
      <div v-else class="fw-bold text-start text-white mx-5">
        <h4>좋아하는 영화를 선택해주세요!</h4>
      </div>
    </div>
  
    <div class="mb-5">
      <div class="fw-bold text-start text-white mx-5">
        <h4>리뷰</h4>
      </div>
      <div v-if="profile.reviews.length > 0">
        <ul class="list-group list-group-flush list-group-numbered mx-5">
          <li 
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-start
              bg-transparent
              text-white
              border-bottom
              my-1"
            v-for="(review, index) in profile.reviews"
            :key="index"
            @dblclick="onClickReview(review.pk)"
          >
            <div class="ms-2 me-auto">
              <h5 class="fw-bold">
                {{review.movie.title}}
                <span class="badge rounded-pill">RANK {{review.rank}}</span>
                 {{ review.title.length > 20 ? review.title.slice(0, 20) + '...' : review.title }}
              </h5>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="fw-bold text-start text-white mx-5">
        <h4>리뷰가 없네요..</h4>
      </div>
    </div>

    <div class="mb-5">
      <div class="fw-bold text-start text-white mx-5">
        <h4>댓글</h4>
      </div>
      <div v-if="profile.comments.length > 0">
        <ul class="list-group list-group-flush list-group-numbered mx-5">
          <li 
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-start
              bg-transparent
              text-white
              border-bottom
              my-1"
            v-for="(comment, index) in profile.comments"
            :key="index"
            @dblclick="onClickReview(comment.review.pk)"
          >
            <div class="ms-2 me-auto">
              <h5 class="fw-bold">
                {{comment.review.movie.title}}
                 {{ comment.content.length > 30 ? comment.content.slice(0, 20) + '...' : comment.content }}
              </h5>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="fw-bold text-start text-white mx-5">
        <h4>댓글이 없네요..</h4>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
import _ from "lodash";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

import MovieImageList from "@/components/MovieImageList.vue";

export default {
  name: "Profile",
  components: {
    MovieImageList
  },
  data() {
    return {
      profile: null,
    }
  },
  methods: {
    onClickReview(review_id){
      this.$router.push({
        name: "ReviewItem",
        params: { review_id},
      });
    },
  },
  computed: {
    likeMovieLists(){
      return  _.chunk(this.profile.like_movies, 15);
    },
    pickMovieLists(){
      return  _.chunk(this.profile.pick_movies, 15);
    }
  },
  created() {
    axios({
      method: 'get',
      url: `${SERVER_URL}/accounts/profile`
    })
      .then(res => this.profile = res.data)
      .catch(err => console.error(err))
  },
};
</script>

<style></style>
