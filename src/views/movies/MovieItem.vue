<template>
  <div>
    {{ movieItem }}
    <create-review></create-review>
  </div>
</template>

<script>
import axios from "axios";
import CreateReview from "@/components/CreateReview.vue";

export default {
  name: "MovieItem",
  components: {
    CreateReview,
  },
  data: function () {
    return {
      movieItem: null,
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
