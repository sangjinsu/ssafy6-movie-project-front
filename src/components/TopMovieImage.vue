<template>
  <swiper-slide>
    <div
      class="card mb-3 mx-auto text-white bg-dark"
      style="max-width: 33.75rem; box-shadow: 5px 5px 5px black"
      @dblclick="pushMovieItem"
    >
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="posterPath" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fw-bold">{{ movie.title }}</h5>
            <p class="card-text text-start">
              <small class="text-muted"
                >개봉일 {{ movie.release_date }} 평점
                {{ movie.vote_average }}</small
              >
            </p>
            <p class="card-text text-break text-start">
              {{ movie.overview.split(" ").slice(0, 30).join(" ") + "..." }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "MovieImage",
  components: {
    SwiperSlide,
  },
  props: {
    movie: {
      type: Object,
    },
  },
  methods: {
    pushMovieItem: function () {
      this.$router.push({
        name: "MovieItem",
        params: { movie_id: this.movie.id },
      });
    },
  },
  computed: {
    posterPath() {
      return `https://image.tmdb.org/t/p/w200${this.movie.poster_path}`;
    },
  },
};
</script>

<style scoped></style>
