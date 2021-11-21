<template>
  <div>
<<<<<<< HEAD
    <!-- {{ movieItem }} -->
    <p>{{ movieItem.title }}</p>
    <p>{{ movieItem.release_date }}</p>
    <p>
      <video-item :movieId="this.movieId"></video-item>
    </p>
    
    <like-movie :movieId="this.movieId" :userList="likeUserList"></like-movie>
    <pick-movie :movieId="this.movieId" :userList="pickUserList"></pick-movie>
=======
    {{ movieItem }}
    <like-movie 
      :movieId="movieId" 
      :hasUser="hasUser"
      @add-like="addLike"
      @delete-like="deleteLike"
    ></like-movie>
    <pick-movie></pick-movie>
>>>>>>> cbb4acb4268268c9fc4c7f3e528278bd7e572001
    <span>Review</span>
    <review-list :reviews="this.reviews" @change-form="changeForm" v-if="show">
    </review-list>
    <create-review
      @create-review="fetchReview" v-else @change-form="changeForm"
    ></create-review>
    
  </div>
</template>

<script>
import axios from "axios";
import ReviewList from "@/components/ReviewList.vue";
import VideoItem from "@/components/VideoItem.vue";
import CreateReview from "@/components/CreateReview.vue";
import LikeMovie from "@/components/LikeMovie.vue";
import PickMovie from "@/components/PickMovie.vue";
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "MovieItem",
  components: {
    ReviewList,
    CreateReview,
    LikeMovie,
    PickMovie,
    VideoItem,
  },
  data: function () {
    return {
      movieItem: null,
      movieId: `${this.$route.params.movie_id}`,
      reviews: [],
      show: true,
      likeUserList: [],
    };
  },
  methods: {
    fetchReview() {
      axios({
        method: "get",
        url: `${SERVER_URL}/community/${this.movieId}/reviews/`,
      })
        .then((res) => {
          console.log(res);
          this.reviews = res.data;
          this.show= true
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeForm() {
      this.show = !this.show
    },
    addLike(){
      console.log(this.getUserPK)
      this.likeUserList.push(this.getUserPK)
    },
    deleteLike(){
      this.likeUserList.splice(this.likeUserList.indexOf(this.getUserPK), 1)
    }
  },
  created() {
    this.fetchReview();
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/${this.$route.params.movie_id}`,
    })
      .then((res) => {
        this.movieItem = res.data;
        this.likeUserList = this.movieItem.like_users
        this.pickUserList = this.movieItem.pick_users
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(['getUserPK']),
    hasUser(){
      return this.likeUserList.includes(this.getUserPK)
    }
  },
};
</script>

<style></style>
