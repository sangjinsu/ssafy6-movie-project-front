<template>
  <div></div>
</template>

<script>
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
import axios from "axios";

export default {
  name: "CommentItem",
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
