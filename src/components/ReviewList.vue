<template>
  <div>
    <p>
      <button @click="createReview">작성</button>
    </p>
    <p
      v-for="moviereview in movieReviews"
      :key="moviereview.id"
      @click="pushReviewItem"
    >
      {{ moviereview.title }}
      {{ moviereview.content }}
      {{ moviereview.rank }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReviewList",
  data: function () {
    return {
      movieReviews: [],
    };
  },
  methods: {
    createReview() {
      this.$emit("create-review");
    },
    pushReviewItem() {
      this.$router.push({
        name: "ReviewItem",
        params: { review_id: `${this.moviewreview.pk}` },
      });
    },
  },
  created() {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/community/${this.$route.params.movie_id}/reviews/`,
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        console.log(res.data);
        this.movieReviews = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style></style>
