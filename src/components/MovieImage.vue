<template>
  <swiper-slide>
    <img
      id="img"
      :src="posterPath"
      class="rounded mx-auto d-block"
      @click="pushMovieItem"
    />
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
