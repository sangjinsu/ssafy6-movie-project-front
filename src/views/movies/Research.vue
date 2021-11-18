<template>
  <div>
    <div>
      <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
        <b-dropdown-item @click="research(28)">액션</b-dropdown-item>
        <b-dropdown-item @click="research(12)">모험</b-dropdown-item>
        <b-dropdown-item @click="research(16)">애니메이션</b-dropdown-item>
        <b-dropdown-item @click="research(80)">범죄</b-dropdown-item>
        <b-dropdown-item @click="research(99)">다큐멘터리</b-dropdown-item>
        <b-dropdown-item @click="research(18)">드라마</b-dropdown-item>
        <b-dropdown-item @click="research(10751)">가족</b-dropdown-item>
        <b-dropdown-item @click="research(14)">판타지</b-dropdown-item>
        <b-dropdown-item @click="research(36)">역사</b-dropdown-item>
        <b-dropdown-item @click="research(27)">공포</b-dropdown-item>
        <b-dropdown-item @click="research(10402)">음악</b-dropdown-item>
        <b-dropdown-item @click="research(9648)">미스터리</b-dropdown-item>
        <b-dropdown-item @click="research(10749)">로맨스</b-dropdown-item>
        <b-dropdown-item @click="research(878)">SF</b-dropdown-item>
        <b-dropdown-item @click="research(10770)">TV 영화</b-dropdown-item>
        <b-dropdown-item @click="research(53)">스릴러</b-dropdown-item>
        <b-dropdown-item @click="research(10752)">전쟁</b-dropdown-item>
        <b-dropdown-item @click="research(37)">서부</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-for="movie in Movies" :key="movie.id">
      <img
        :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
        alt="poster"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Research",
  data: function () {
    return {
      Movies: null,
    };
  },
  methods: {
    research: function (genres) {
      axios({
        method: "get",
        url: `http://127.0.0.1:8000/movies/${genres}/genres/`,
        headers: this.$store.getters["setToken"],
      })
        .then((res) => {
          console.log(res.data);
          this.Movies = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
