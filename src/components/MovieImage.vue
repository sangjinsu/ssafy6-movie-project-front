<template>
  <div>
    <img :src="posterPath" class="rounded mx-auto d-block">
  </div>
</template>

<script>
export default {
  name: 'MovieImage',
  props: {
    movie: {
      type: Object
    }
  },
  computed: {
    posterPath(){
      return `https://image.tmdb.org/t/p/w200${this.movie.poster_path}`;
    }
  },
}
</script>