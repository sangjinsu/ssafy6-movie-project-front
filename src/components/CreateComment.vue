<template>
  <div>
    <b-row style="max-width: 640px; margin: 0px auto">
      <b-col
        class="d-flex justify-content-between"
        style="padding: 0px; margin: 1vw 0"
      >
        <b-form-input
          type="text"
          v-model.trim="content"
          @keyup.enter="createComment"
          placeholder="내용을 입력하세요."
          style="width: 600px"
        />
        <button @click="createComment">+</button>
      </b-col>
    </b-row>
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

<style scoped>
.form-control {
  width: 70%;
}
</style>
