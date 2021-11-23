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
import CommentItem from "@/components/CommentItem.vue";

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
  },
};
</script>

<style></style>
