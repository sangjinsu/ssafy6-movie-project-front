<template>
  <div>
    <p>
      {{ reviewItem.title }}
      {{ reviewItem.content }}
      {{ reviewItem.rank }}
      {{ reviewItem.created_at }}
      {{ reviewItem.updated_at }}
      <b-icon icon="pencil-square" @click="updateReviewItem(movie.id)"></b-icon>
      <button @click="deleteReviewItem">X</button>
    </p>
    <create-comment :reviewNum="this.reviewNum" @create-comment="fetchComments"></create-comment>
    <comment-list :reviewNum="this.reviewNum"></comment-list>
  </div>
</template>

<script>
import axios from "axios";
import CreateComment from "@/components/CreateComment.vue";
import CommentList from "@/components/CommentList";

export default {
  name: "ReviewItem",
  components: {
    CreateComment,
    CommentList,
  },
  data: function () {
    return {
      reviewItem: null,
      reviewNum: `${this.$route.params.review_id}`,
      comments : null
    };
  },
  methods: {
    deleteReviewItem() {
      axios({
        method: "delete",
        url: `http://127.0.0.1/community/reviews/${this.reviewNum}/`,
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReviewItem(id) {
      axios({
        method: "put",
        url: `http://127.0.0.1/community/reviews/${this.reviewNum}/`,
        headers: this.$store.getters["setToken"],
        data: {
          title: this.reviewItem.title,
          content: this.reviewItem.content,
          rank: this.reviewItem.rank,
        },
      })
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "CreateReview",
            params: { movie_id: id },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchComments(){
 
      }
  },
  created() {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/community/reviews/${this.reviewNum}`,
        headers: this.$store.getters["setToken"],
      }).then((res) => {
          // console.log(this.$route.params.review_id);
          this.reviewItem = res.data;
      }).catch((err) => {
          console.log(err);
      });
  },
};
</script>

<style></style>
