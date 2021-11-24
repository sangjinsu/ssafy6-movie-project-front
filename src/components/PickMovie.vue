<template>
  <div class="h2">
    <!-- <b-icon icon="plus" @click="pickMovie" v-if="!pickUser"></b-icon>
    <b-icon icon="check2" @click="pickMovie" v-else></b-icon> -->
    <span @click="pickMovie" v-if="!pickUser" style="color: white">
      <i class="fas fa-plus"></i>
    </span>
    <span @click="pickMovie" v-else style="color: #4285f4">
      <i class="fas fa-check"></i>
    </span>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "PickMovie",

  props: {
    movieId: String,
    pickUser: Boolean,
  },
  methods: {
    pickMovie() {
      axios({
        method: "post",
        url: `${SERVER_URL}/movies/pick/`,
        data: {
          movieId: parseInt(this.movieId),
        },
      })
        .then(() => {
          if (this.pickUser) {
            this.$emit("delete-pick");
          } else {
            this.$emit("add-pick");
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
