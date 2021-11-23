<template>
  <div>
    <!-- <div style="margin-top: 60px">
      {{ movieItem.title }}
      {{ movieItem.original_title }}
      {{ movieItem.overview }}
      {{ movieItem.popularity }}
      {{ movieItem.release_date }}
      {{ movieItem.vote_average }}
      {{ movieItem.vote_count }}
      <span v-for="genre in genres" :key="genre.id">
        {{ genre.name }}
      </span>
    </div> -->

    <div
      class="card mb-3 bg-dark text-white"
      style="max-width: 1000px; margin-top: 60px"
    >
      <div class="row g-0">
        <div class="col-md-4 d-flex justify-content-center">
          <img
            :src="this.poster_path"
            alt="Image"
            class="img-fluid rounded-start"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ movieItem.title }}</h5>
            <h6>{{ movieItem.original_title }}</h6>
            <p class="card-text">{{ movieItem.overview }}</p>
            <div class="card-text">{{ movieItem.popularity }}</div>
            <div class="card-text">{{ movieItem.release_date }}</div>
            <div class="card-text">{{ movieItem.vote_average }}</div>
            <div class="card-text">
              <small class="text-muted">{{ movieItem.vote_count }}</small>
            </div>
            <span v-for="genre in genres" :key="genre.id">
              {{ genre.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <like-movie
      :movieId="movieId"
      :hasUser="hasUser"
      @add-like="addLike"
      @delete-like="deleteLike"
    ></like-movie>
    <pick-movie
      :movieId="movieId"
      :pickUser="pickUser"
      @add-pick="addPick"
      @delete-pick="deletePick"
    ></pick-movie>
    <span>Review</span>
    <review-list :reviews="this.reviews" @change-form="changeForm" v-if="show">
    </review-list>
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
