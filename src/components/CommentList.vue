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
    deleteComment(pk) {
      axios({
        method: "delete",
        url: `${SERVER_URL}/community/comments/${pk}`,
      })
        .then((res) => {
          console.log(res);
          this.$emit("delete-comment");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>

<style></style>
