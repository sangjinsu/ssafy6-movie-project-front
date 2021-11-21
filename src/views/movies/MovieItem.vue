<template>
  <div>
    {{ movieItem }}
    <like-movie :movieId="this.movieId" :userList="likeUserList"></like-movie>
    <pick-movie></pick-movie>
    <span>Review</span>
    <review-list :reviews="this.reviews" @change-form="changeForm" v-if="show">
    </review-list>
    <create-review
      @create-review="fetchReview" v-else @change-form="changeForm"
    ></create-review>
    
  </div>
</template>

<script>
import axios from "axios";
import ReviewList from "@/components/ReviewList.vue";

import CreateReview from "@/components/CreateReview.vue";
import LikeMovie from "@/components/LikeMovie.vue";
import PickMovie from "@/components/PickMovie.vue";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "MovieItem",
  components: {
    ReviewList,
    CreateReview,
    LikeMovie,
    PickMovie,
  },
  data: function () {
    return {
      movieItem: null,
      movieId: `${this.$route.params.movie_id}`,
      reviews: [],
      show: true,
      likeUserList: []
    };
  },
  methods: {
    fetchReview() {
      axios({
        method: "get",
        url: `${SERVER_URL}/community/${this.movieId}/reviews/`,
      })
        .then((res) => {
          console.log(res);
          this.reviews = res.data;
          this.show= true
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeForm() {
      this.show = !this.show
    }
  },
  created() {
    this.fetchReview();
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/${this.$route.params.movie_id}`,
    })
      .then((res) => {
        this.movieItem = res.data;
        this.likeUserList = this.movieItem.like_users
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
