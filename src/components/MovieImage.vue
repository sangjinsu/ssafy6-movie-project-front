<template>
  <div>
    <img
      :src="posterPath"
      class="rounded mx-auto d-block"
      @click="pushMovieItem"
    />
  </div>
</template>

<script>
export default {
  name: "MovieImage",

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
