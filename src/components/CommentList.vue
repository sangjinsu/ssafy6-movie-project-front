<template>
  <div>
    <p v-for="comment in commentList" :key="comment.pk">
      {{ comment.content }}
      {{ comment.user }}
      {{ comment.created_at }}
      {{ comment.updated_at }}
      <button @click="deleteComment(comment.pk)">x</button>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentList",
  
  props: {
    reviewNum: null,
    commentList: []
  },
  methods: {
    deleteComment(pk) {
      // console.log(comment, index);
      // this.Comments.splice(index, 1);
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/community/comments/${pk}`,
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(`${this.reviewNum}`);
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/community/${this.reviewNum}/comments/`,
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        console.log(res.data);
        // this.Comments = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
