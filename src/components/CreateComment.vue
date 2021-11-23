<template>
  <div>
    <b-row style="margin: 1vh">
      <b-col sm="9" class="d-flex justify-content-end">
        <b-form-input
          type="text"
          v-model.trim="content"
          @keyup.enter="createComment"
          placeholder="내용을 입력하세요."
        />
      </b-col>
      <b-col sm="3" class="d-flex justify-content-start">
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
