<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <movie-image
        v-for="movie in movieList"
        :key="movie.id"
        :movie="movie"
      ></movie-image>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import MovieImage from "@/components/MovieImage.vue";
import { Swiper } from "vue-awesome-swiper";

export default {
  name: "MovieImageList",
  components: {
    MovieImage,
    Swiper,
  },
  props: {
    movieList: {
      type: Array,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 5,
        slidesPerGroup: 5,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style scoped>
.swiper {
  margin-bottom: 2vw;
}
</style>
