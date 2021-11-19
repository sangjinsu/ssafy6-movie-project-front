<template>
  <div>
    <button @click="likeMovie">♥</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LikeMovie",
  props: {
    movieId: null,
  },
  methods: {
    likeMovie() {
      console.log(this.movieId);
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/movies/like/",
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
