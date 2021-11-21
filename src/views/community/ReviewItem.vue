<template>
  <div>
    <p>
      {{ reviewItem.title }}
      {{ reviewItem.content }}
      {{ reviewItem.rank }}
      {{ reviewItem.created_at }}
      {{ reviewItem.updated_at }}
      <b-icon icon="pencil-square"></b-icon>
      <button @click="deleteReviewItem">X</button>
    </p>
    <create-comment
      :reviewNum="this.reviewNum"
      @create-comment="fetchComments"
    ></create-comment>
    <comment-list
      :reviewNum="this.reviewNum"
      :commentList="this.comments"
      @delete-comment="fetchComments"
    >
    </comment-list>
  </div>
</template>

<script>
// const LOCALHOST = process.env.VUE_APP_LOCALHOST
import axios from "axios";
import CreateComment from "@/components/CreateComment.vue";
import CommentList from "@/components/CommentList";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

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
      comments: Array,
      movieId: null,
    };
  },

  methods: {
    deleteReviewItem() {
      // console.log(this.movieId)
      axios({
        method: "delete",
        url: `${SERVER_URL}/community/${this.movieId}/reviews/${this.reviewNum}/`,
      })
        .then((res) => {
          console.log(res);
          this.$emit("delete-review");
          this.$router.push({
            name: "MovieItem",
            params: { movie_id: this.movieId },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchComments() {
      // console.log(this.$store.getters["setToken"])
      axios({
        method: "get",
        url: `${SERVER_URL}/community/${this.reviewNum}/comments/`,
      })
        .then((res) => {
          // console.log(res)
          this.comments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchComments();
    axios({
      method: "get",
      url: `${SERVER_URL}/community/reviews/${this.reviewNum}`,
    })
      .then((res) => {
        // console.log(this.$route.params.review_id);
        this.movieId = res.data.movie.id;
        this.reviewItem = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
