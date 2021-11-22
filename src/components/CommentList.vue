<template>
  <div>
    <update-comment
      v-if="show"
      :commentId="this.commentId"
      @update-comment="fetchComments"
    ></update-comment>
    <p v-for="comment in commentList" :key="comment.pk">
      {{ comment.content }}
      {{ comment.user }}
      {{ comment.created_at }}
      {{ comment.updated_at }}
      {{ comment.pk }}
      <b-icon
        icon="pencil-square"
        @click="updateComment(comment.pk)"
        v-if="userPk == comment.user.pk"
      ></b-icon>
      <button
        @click="deleteComment(comment.pk)"
        v-if="userPk == comment.user.pk"
      >
        x
      </button>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import UpdateComment from "@/components/UpdateComment.vue";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "CommentList",
  data: function () {
    return {
      commentId: null,
      userPk: this.$store.state.userPK,
      show: false,
    };
  },
  components: {
    UpdateComment,
  },
  props: {
    reviewNum: null,
    commentList: [],
  },
  methods: {
    updateComment(pk) {
      this.show = true;
      this.commentId = pk;
    },
    fetchComments() {
      // console.log(this.$store.getters["setToken"])
      axios({
        method: "get",
        url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
      })
        .then((res) => {
          // console.log(res)
          this.commentList = res.data;
          this.show = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
  },
};
</script>

<style></style>
