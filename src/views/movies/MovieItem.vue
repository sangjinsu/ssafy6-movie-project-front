<template>
  <div class="container h-100">
    <div
      class="
        card
        mb-3
        bg-dark
        text-white
        d-flex
        justify-content-center
        align-items-center
        h-100
      "
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="this.poster_path"
            alt="Image"
            class="img-fluid rounded-start"
            style="height: 100%"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4 class="card-title d-flex justify-content-start">
              {{ movieItem.title }}
            </h4>
            <h5 class="d-flex justify-content-start">
              {{ movieItem.original_title }}
            </h5>
            <p class="card-text">
              <small>{{ movieItem.overview }}</small>
            </p>
            <h6 class="card-text d-flex justify-content-start">
              <small>인기도: {{ movieItem.popularity }}</small>
            </h6>
            <h6 class="card-text d-flex justify-content-start">
              <small>공개일: {{ movieItem.release_date }}</small>
            </h6>
            <h6 class="card-text d-flex justify-content-start">
              <small>평점: {{ movieItem.vote_average }}</small>
            </h6>

            <div class="d-flex db-highlight">
              <span class="me-auto bd-highlight">
                장르:
                <span v-for="genre in genres" :key="genre.id">
                  {{ genre.name }}
                </span>
              </span>
              <like-movie
                :movieId="movieId"
                :hasUser="hasUser"
                @add-like="addLike"
                @delete-like="deleteLike"
                class="d-inline bd-highlight me-2"
              ></like-movie>
              <pick-movie
                :movieId="movieId"
                :pickUser="pickUser"
                @add-pick="addPick"
                @delete-pick="deletePick"
                class="d-inline bd-highlight"
              ></pick-movie>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <span><h3>Review</h3></span>
      <span
        ><button
          type="button"
          class="btn btn-secondary mb-3"
          @click="changeForm"
          v-if="show"
        >
          작성
        </button></span
      >
    </div>
    <review-list :reviews="this.reviews" v-if="show"> </review-list>
    <create-review
      @create-review="fetchReview"
      v-else
      @change-form="changeForm"
    ></create-review>
    <update-review @update-review="fetchReview" v-if="false"></update-review>
  </div>
</template>

<script>
import axios from "axios";
import ReviewList from "@/components/ReviewList.vue";
import CreateReview from "@/components/CreateReview.vue";
import LikeMovie from "@/components/LikeMovie.vue";
import PickMovie from "@/components/PickMovie.vue";
import UpdateReview from "@/components/UpdateReview.vue";
import { mapGetters } from "vuex";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "MovieItem",
  components: {
    ReviewList,
    CreateReview,
    LikeMovie,
    PickMovie,
    UpdateReview,
  },
  data: function () {
    return {
      movieItem: null,
      movieId: `${this.$route.params.movie_id}`,
      reviews: [],
      show: true,
      likeUserList: [],
      pickUserList: [],
      genres: [],
      poster_path: null,
    };
  },
  methods: {
    fetchReview() {
      axios({
        method: "get",
        url: `${SERVER_URL}/community/${this.movieId}/reviews/`,
      })
        .then((res) => {
          this.reviews = res.data;
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeForm() {
      this.show = !this.show;
    },
    addLike() {
      this.likeUserList.push(this.getUserPK);
    },
    deleteLike() {
      this.likeUserList.splice(this.likeUserList.indexOf(this.getUserPK), 1);
    },
    addPick() {
      this.pickUserList.push(this.getUserPK);
    },
    deletePick() {
      this.pickUserList.splice(this.pickUserList.indexOf(this.getUserPK), 1);
    },
  },
  created() {
    this.fetchReview();
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/${this.$route.params.movie_id}`,
    })
      .then((res) => {
        console.log(res.data);
        this.movieItem = res.data;
        this.likeUserList = this.movieItem.like_users;
        this.pickUserList = this.movieItem.pick_users;
        this.genres = this.movieItem.genres;
        this.poster_path = `https://image.tmdb.org/t/p/w200${this.movieItem.poster_path}`;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(["getUserPK"]),
    hasUser() {
      return this.likeUserList.includes(this.getUserPK);
    },
    pickUser() {
      return this.pickUserList.includes(this.getUserPK);
    },
  },
};
</script>

<style>
.card {
  opacity: 1;
}
</style>
