<template>
  <div>
    <p v-for="(comment, index) in commentList" :key="comment.pk">
      {{ comment.content }}
      {{ comment.user }}
      {{ comment.created_at }}
      {{ comment.updated_at }}
      <button @click="deleteComment(index)">x</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "CommentList",
  data: function () {
    return {
      commentId: null,
    };
  },
  props: {
    reviewNum: null,
    commentList: [],
  },
  methods: {
    deleteComment(index) {
      // console.log(comment, index);
      this.Comments.splice(index, 1);
      axios({
        method: "delete",
        url: `${SERVER_URL}/community/comments/1`,
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res);
          this.$emit("delete-comment");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // console.log(`${this.reviewNum}`);
    axios({
      method: "get",
      url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
