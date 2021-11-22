<template>
  <div v-if="reviewItem">
    <p>
      {{ reviewItem.title }}
      {{ reviewItem.content }}
      {{ reviewItem.rank }}
      {{ reviewItem.created_at }}
      {{ reviewItem.updated_at }}
      <b-icon
        icon="pencil-square"
        @click="updateReviewItem()"
        v-if="userPk == reviewItem.user.pk"
      ></b-icon>
      <button
        @click="deleteReviewItem"
        v-if="userPk == reviewItem.user.pk"
      >
        X
      </button>
    </p>

    <create-review v-if="show"></create-review>
    <create-comment
      :reviewNum="reviewNum"
      @create-comment="fetchComments"
    ></create-comment>
    <comment-list
      :reviewNum="reviewNum"
      :commentList="comments"
      @delete-comment="fetchComments"
    >
    </comment-list>
  </div>
</template>

<script>
import axios from "axios";
import CreateComment from "@/components/CreateComment.vue";
import CommentList from "@/components/CommentList";
import CreateReview from "@/components/CreateReview.vue";

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "ReviewItem",
  components: {
    CreateComment,
    CommentList,
    CreateReview,
  },
  data: function () {
    return {
      reviewItem: null,
      reviewNum: `${this.$route.params.review_id}`,
      comments: [],
      movieId: null,
      show: false,
      userPk: this.$store.state.userPK,
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
    updateReviewItem() {
      this.$router.push({
        name: "UpdateReview",
        // path: "/updatereview/:review_id",
        params: { review_id: this.reviewNum },
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
        console.log(res.data);
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
