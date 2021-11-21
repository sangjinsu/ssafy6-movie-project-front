<template>
  <iframe
    id="player"
    type="text/html"
    width="640"
    height="360"
    :src="videoUrl"
    frameborder="0"
  >
  </iframe>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "VideoItem",
  data() {
    return {
      videoId: null,
      baseUrl: "http://www.youtube.com/embed/",
    };
  },
  props: {
    title: String,
  },
  computed: {
    videoUrl() {
      return `https://youtube.com/embed/${this.videoId}`;
    },
  },
  created() {
    axios({
      method: "post",
      url: `${SERVER_URL}/movies/youtube/`,
      data: { title: this.title },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style></style>
