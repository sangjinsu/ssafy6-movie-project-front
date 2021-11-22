<template>
  <div>
    <input type="text" v-model.trim="content" @keyup.enter="udpateComment" />
    <button @click="updateComment">+</button>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "UpdateComment",
  data: function () {
    return {
      content: null,
    };
  },
  props: {
    commentId: Number,
  },
  methods: {
    updateComment() {
      // console.log(`${this.reviewNum}`);
      const commentItem = {
        content: this.content,
      };
      if (commentItem.content) {
        axios({
          method: "put",
          url: `${SERVER_URL}/community/comments/${this.commentId}/`,
          data: commentItem,
        })
          .then((res) => {
            console.log(res);
            this.$emit("update-comment");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style></style>
