<template>
  <div>
    <b-icon icon="suit-heart" variant="danger" @click="likeMovie" v-if="!hasUser" ></b-icon>
    <b-icon icon="suit-heart-fill" variant="danger" @click="likeMovie" v-else></b-icon>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "LikeMovie",
  data() {
    return {  
      show: true,
    }
  },
  props: {
    movieId: String,
    userList: Array,
  },
  methods: {
    likeMovie() {
      axios({
        method: "post",
        url: `${SERVER_URL}/movies/like/`,
        data: {
          movieId: parseInt(this.movieId)
        }
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
