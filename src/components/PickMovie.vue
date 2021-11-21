<template>
  <div>
    <b-icon icon="plus" @click="pickMovie"></b-icon>
    <b-icno icon="check2"></b-icno>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "PickMovie",
  props: {
    movieId: String,
    userList: Array,
  },
  methods: {
    pickMovie() {
      axios({
        method: "post",
        url: `${SERVER_URL}/movies/pick/`,
        data: {
          movieId: parseInt(this.movieId)
        }
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    hasUser() {
      console.log(this.getUser)
      return this.userList.includes(this.getUser.pk)
    }
  }
};
</script>

<style></style>
