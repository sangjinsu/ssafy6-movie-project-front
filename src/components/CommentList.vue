<template>
  <div>
    <p>
      <comment-item
        v-for="comment in commentList"
        :key="comment.pk"
        :reviewNum="reviewNum"
        :comment="comment"
        @delete-comment="deleteComment"
        @update-comment="deleteComment"
      ></comment-item>
    </p>
  </div>
</template>

<script>
import axios from "axios";

import CommentItem from "@/components/CommentItem.vue";
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
    CommentItem,
  },
  props: {
    reviewNum: String,
    commentList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteComment() {
      this.$emit("delete-comment");
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
  },
};
</script>

<style></style>
