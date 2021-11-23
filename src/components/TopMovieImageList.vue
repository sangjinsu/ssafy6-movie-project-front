<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
       <top-movie-image v-for="movie in movieList" :key="movie.id" :movie="movie"></top-movie-image>
    </swiper>
  </div>
</template>

<script>
import TopMovieImage from '@/components/TopMovieImage.vue';
import { Swiper} from 'vue-awesome-swiper'


export default {
    name: 'TopMovieImageList',
    components: {
       TopMovieImage, Swiper
    },
  props: {
    movieList: {
      type: Array
    }
  },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
        }
      }
    }
  }
</script>

