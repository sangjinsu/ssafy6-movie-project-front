<template>
  <div>
    <b-icon icon="suit-heart-fill" variant="danger" @click="likeMovie"></b-icon>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

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
        url: `${SERVER_URL}/movies/like/`,
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
