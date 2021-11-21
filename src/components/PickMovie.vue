<template>
  <div>
    <b-icon icon="plus" @click="pickMovie" v-if="!pickUser"></b-icon>
    <b-icon icon="check2" @click="pickMovie" v-else></b-icon>
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
