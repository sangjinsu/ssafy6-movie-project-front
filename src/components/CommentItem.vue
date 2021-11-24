<template>
  <div v-if="show" style="color: white; max-width: 640px; margin: 0px auto">
    <div class="d-flex bd-highlight">
      <div class="me-auto bd-highlight">
        <small style="margin-right: 1vw"
          >작성자: {{ comment.user.username }}</small
        >
        <small>{{ new Date(comment.created_at).toLocaleString() }}</small>
      </div>

      <b-icon
        class="bd-highlight"
        style="margin-right: 0.5vw"
        icon="pencil-square"
        @click="updateComment(comment.pk)"
        v-if="userPk == comment.user.pk"
      ></b-icon>
      <b-icon
        class="bd-highlight"
        icon="x-square"
        @click="deleteComment(comment.pk)"
        v-if="userPk == comment.user.pk"
      ></b-icon>
    </div>
    <h4 class="d-flex justify-content-start">
      {{ comment.content }}
    </h4>
  </div>
  <update-comment
    v-else
    :commentId="this.commentId"
    @update-comment="fetchComments"
    :comment="this.comment"
  ></update-comment>
</template>

<script>
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
import UpdateComment from "@/components/UpdateComment.vue";
import axios from "axios";

export default {
  name: "CommentItem",
  data: function () {
    return {
      userPk: this.$store.state.userPK,
      show: true,
    };
  },
  components: {
    UpdateComment,
  },
  props: {
    reviewNum: String,
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateComment(pk) {
      this.show = false;
      this.commentId = pk;
    },
    fetchComments() {
      this.$emit("update-comment");
      this.show = true;
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
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
    })
      .then((res) => {
        console.log(res.data);
        this.comments = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
