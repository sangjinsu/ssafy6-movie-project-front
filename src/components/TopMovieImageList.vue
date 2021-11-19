<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
       <movie-image v-for="movie in movieList" :key="movie.id" :movie="movie"></movie-image>
    </swiper>
  </div>
</template>

<script>
import MovieImage from '@/components/MovieImage.vue';
import { Swiper} from 'vue-awesome-swiper'


export default {
    name: 'TopMovieImageList',
    components: {
       MovieImage, Swiper
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

