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
    <create-comment :reviewNum="this.reviewNum" @create-comment="fetchComments"></create-comment>
    <comment-list :reviewNum="this.reviewNum" :commentList="this.comments" @delete-comment="deleteComment" :comments="this.comments">
    </comment-list>
  </div>
</template>

<script>
// const LOCALHOST = process.env.VUE_APP_LOCALHOST
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
      comments : Array,
      movieId: null,
    };
  },
 
  methods: {
    deleteReviewItem() {
      // console.log(this.movieId)
      axios({
        method: "delete",
        url: `LOCALHOST/community/${this.movieId}/reviews/${this.reviewNum}/`,
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res);
          this.$emit("delete-review")
          this.$router.push({ name: "MovieItem", params: { movie_id: this.movieId }, })
        })
        .catch((err) => {
          console.log(err);
        });
    },
  
    fetchComments(){
        // console.log(this.$store.getters["setToken"])
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/community/${this.reviewNum}/comments/`,
          headers: this.$store.getters["setToken"], 
        })
          .then(res => {
            // console.log(res)
            this.comments = res.data
          })
          .catch(err => {
            console.log(err)
          })
      }
  },
  deleteComment(){
    axios({
      method: 'get',
      url: `http://1237.0.0.1:8000/community/${this.reviewNum}/comments/`,
      headers: this.$store.getters["setToken"], 
    })
      .then(res => {
        console.log(res.data)
        this.comments = res.data
      })
      .catch(err =>
      console.log(err))
  },
  created() {
    this.fetchComments()
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/community/reviews/${this.reviewNum}`,
        headers: this.$store.getters["setToken"],
      }).then((res) => {
          // console.log(this.$route.params.review_id);
          this.movieId = res.data.movie.id
          this.reviewItem = res.data;
      }).catch((err) => {
          console.log(err);
      });
  },
};
</script>

<style></style>
