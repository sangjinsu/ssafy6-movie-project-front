<template>
  <div>
    <input
      type="text"
      v-model.trim="content"
      @keyup.enter="createComment"
      placeholder="내용을 입력하세요."
    />
    <button @click="createComment">+</button>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "CreateComment",
  data: function () {
    return {
      content: null,
    };
  },
  props: {
    reviewNum: null,
  },
  methods: {
    createComment() {
      // console.log(`${this.reviewNum}`);
      const commentItem = {
        content: this.content,
      };
      if (commentItem.content) {
        axios({
          method: "post",
          url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
          data: commentItem,
          headers: this.$store.getters["setToken"],
        })
          .then(() => {
            this.$emit("create-comment");
            this.content = "";
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
