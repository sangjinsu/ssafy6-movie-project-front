<template>
  <div>
    <h1>추천 영화</h1>
    <movie-image-list :movieList="recommendMovie"></movie-image-list>
  </div>
</template>

<script>
import axios from "axios";
import MovieImageList from "@/components/MovieImageList.vue";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Recommend",
  components: {
    MovieImageList,
  },
  data() {
    return {
      recommendMovie: null,
    };
  },
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/recommend/`,
    })
      .then((res) => {
        this.recommendMovie = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style></style>
