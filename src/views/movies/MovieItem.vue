<template>
  <div>
    {{ movieItem }}
    <like-movie :movieId="this.movieId"></like-movie>
    <pick-movie></pick-movie>
    <span>Review</span>
    <create-review
      v-if="show"
      @toggle="show = false"
      @create-review="fetchReview"
    ></create-review>
    <review-list v-else :reviews="this.reviews"></review-list>
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
      show: false,
      reviews: [],
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchReview();
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/${this.$route.params.movie_id}`,
    })
      .then((res) => {
        this.movieItem = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
