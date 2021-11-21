<template>
  <div>
    <b-icon
      icon="suit-heart"
      variant="danger"
      @click="likeMovie"
      v-if="!hasUser"
    ></b-icon>
    <b-icon
      icon="suit-heart-fill"
      variant="danger"
      @click="likeMovie"
      v-else
    ></b-icon>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "LikeMovie",

  props: {
    movieId: String,
    hasUser: Boolean,
  },
  methods: {
    likeMovie() {
      axios({
        method: "post",
        url: `${SERVER_URL}/movies/like/`,
        data: {
          movieId: parseInt(this.movieId),
        },
      })
        .then(() => {
          if (this.hasUser) {
            this.$emit("delete-like");
          } else {
            this.$emit("add-like");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
