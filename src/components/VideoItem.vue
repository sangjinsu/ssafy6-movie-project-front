<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  name: "VideoItem",
  data: function () {
    return {
      video: null,
    };
  },
  methods: {
    created() {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/movies/youtube/",
        headers: this.$store.getters["setToken"],
      });
    },
  },
};
</script>

<style></style>
