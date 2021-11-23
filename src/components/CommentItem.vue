<template>
  <div>
    <div>
      <p v-if="show" style="color: white">
        작성자: {{ comment.user.username }}
        {{ comment.created_at }}
        {{ comment.content }}
        <!-- {{ comment.updated_at }} -->

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
      <update-comment
        v-else
        :commentId="this.commentId"
        @update-comment="fetchComments"
        :comment="this.comment"
      ></update-comment>
    </div>
  </div>
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
