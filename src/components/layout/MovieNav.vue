<template>
  <div>
    <b-nav
      small
      type="dark"
      class="navbar-expand-md bg-dark fw-bold d-flex bd-highlight mb-4"
    >
      <b-nav-item to="/movies" class="text-decoration-none p-2 bd-highlight"
        >Home</b-nav-item
      >
      <b-nav-item to="/research" class="text-decoration-none p-2 bd-highlight"
        >Search</b-nav-item
      >
      <b-nav-item to="/recommend" class="text-decoration-none p-2 bd-highlight"
        >Recommend</b-nav-item
      >

      <v-select
        v-model="movieSelected"
        :options="options"
        class="p-2"
        @keyup.enter="search"
      ></v-select>

      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="User"
        toggle-class="nav-link-custom"
        right
        class="ms-auto p-2 bd-highlight"
      >
        <b-dropdown-item @click="logout">로그아웃</b-dropdown-item>
        <b-dropdown-item to="/profile">프로필</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-b-modal="'signout-modal'">회원탈퇴</b-dropdown-item>
        <b-modal
          id="signout-modal"
          title="회원탈퇴?"
          @ok="signout"
          hide-header-close
          centered
        >
          <p class="my-4">좋아요와 찜한 영화 및 리뷰가 사라집니다</p>
        </b-modal>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
import axios from "axios";

const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  name: "MovieNav",
  data() {
    return {
      movieSelected: "검색",
      movieNames: [],
      // options: [
      //   { label: "액션", id: 28 },
      //   { label: "모험", id: 12 },
      //   { label: "애니메이션", id: 16 },
      //   { label: "범죄", id: 80 },
      //   { label: "다큐멘터리", id: 99 },
      //   { label: "드라마", id: 18 },
      //   { label: "가족", id: 10751 },
      //   { label: "판타지", id: 14 },
      //   { label: "역사", id: 36 },
      //   { label: "공포", id: 27 },
      //   { label: "음악", id: 10402 },
      //   { label: "미스터리", id: 9648 },
      //   { label: "로맨스", id: 10749 },
      //   { label: "SF", id: 878 },
      //   { label: "TV 영화", id: 10770 },
      //   { label: "스릴러", id: 53 },
      //   { label: "전쟁", id: 10752 },
      //   { label: "서부", id: 37 },
      // ],
    };
  },
  computed: {
    options() {
      return this.movieNames.map((movieName) => {
        return {
          label: movieName.title,
          id: movieName.pk,
        };
      });
    },
  },
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/movies/name/`,
    }).then((res) => {
      console.log(res);
      this.movieNames = res.data;
    });
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
    signout() {
      axios({
        method: "delete",
        url: `${SERVER_URL}/accounts/delete/`,
      }).then(() => {
        this.$store.dispatch("logout");
        this.$router.push({ name: "Signup" });
      });
    },
    search(event) {
      event.preventDefault();
      console.log(this.searchMovie);
    },
  },
};
</script>

<style scoped>
a.nav-link {
  color: white;
}
.navbar-brand {
  margin-left: 16px;
}
.dropdown-menu {
  background-color: #212529 !important;
  color: white !important;
}
.dropdown-item {
  color: white;
}
</style>
