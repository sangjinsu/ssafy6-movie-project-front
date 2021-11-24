<template>
  <div v-if="reviewItem" class="container h-100">
    <div
      class="card text-white bg-dark"
      style="max-width: 640px; margin: 0px auto"
    >
      <div class="card-header d-flex justify-content-between">
        <h5 class="d-flex align-items-center" style="margin-bottom: 0">
          작성자: {{ reviewItem.user.username }}
        </h5>
        <h5 class="d-flex align-items-center" style="margin-bottom: 0">
          <i class="fas fa-star me-2" style="color: yellow"></i>:
          {{ reviewItem.rank }}
        </h5>
      </div>
      <div class="card-body" style="word-break: break-all">
        <p class="card-title d-flex justify-content-start">
          {{ reviewItem.title }}
        </p>
        <p class="card-text d-flex justify-content-start">
          {{ reviewItem.content }}
        </p>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-start">
          <small>
            작성시간
            {{ new Date(reviewItem.created_at).toLocaleString() }}
          </small>
        </div>
        <div class="d-flex bd-highlight">
          <div class="me-auto bd-highlight">
            <small
              >수정시간
              {{ new Date(reviewItem.updated_at).toLocaleString() }}</small
            >
          </div>
          <div class="h5 bd-highlight">
            <b-icon
              style="margin-right: 0.5em"
              icon="pencil-square"
              @click="updateReviewItem()"
              v-if="userPk == reviewItem.user.pk"
            ></b-icon>
            <b-icon
              icon="x-square"
              @click="deleteReviewItem"
              v-if="userPk == reviewItem.user.pk"
            ></b-icon>
          </div>
        </div>
      </div>
    </div>

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

<style scoped></style>
