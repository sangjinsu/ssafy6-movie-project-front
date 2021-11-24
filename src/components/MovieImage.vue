<template>
  <swiper-slide>
    <div class="scale">
      <img
        id="img"
        :src="posterPath"
        class="rounded mx-auto d-block"
        @dblclick="pushMovieItem"
      />
    </div>
    <div
      class="d-flex justify-content-start mt-1"
      style="color: white; opacity: 0.7"
    >
      <small>{{ movie.title }}</small>
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

<style>
.scale {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out; /* 부드러운 모션을 위해 추가*/
  transition-delay: 0.2s;
}
.scale:hover {
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
}
</style>
