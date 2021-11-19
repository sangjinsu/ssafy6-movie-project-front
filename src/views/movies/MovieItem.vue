<template>
  <div>
    {{ movieItem }}
    <like-movie :movieId="this.movieId"></like-movie>
    <pick-movie></pick-movie>
    <span>Review</span>
    <create-review v-if="show" @toggle="show = false"></create-review>
    <review-list @create-review="show = true" v-else></review-list>
  </div>
</template>

<script>
import axios from "axios";
import ReviewList from "@/components/ReviewList.vue";
import CreateReview from "@/components/CreateReview.vue";
import LikeMovie from "@/components/LikeMovie.vue";
import PickMovie from "@/components/PickMovie.vue";

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
    };
  },
  created() {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/movies/${this.$route.params.movie_id}`,
      headers: this.$store.getters["setToken"],
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
