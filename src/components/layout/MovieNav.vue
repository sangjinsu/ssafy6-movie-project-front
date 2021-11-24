<template>
  <div>
    <b-nav
      small
      type="dark"
      style="background-color: black"
      class="
        navbar-expand-md
        fw-bold
        fs-6
        d-flex
        bd-highlight
        mb-4
        fixed-top
        align-items-center
      "
    >
      <b-navbar-brand>
        <img src="../../assets/logo.png" alt="logo" width="50" height="50" />
      </b-navbar-brand>
      <b-nav-item to="/movies" class="text-decoration-none p-2 bd-highlight"
        >Home</b-nav-item
      >
      <b-nav-item to="/research" class="text-decoration-none p-2 bd-highlight"
        >Search</b-nav-item
      >
      <b-nav-item to="/recommend" class="text-decoration-none p-2 bd-highlight"
        >Recommend</b-nav-item
      >

      <b-nav-form @submit.prevent="onSubmit">
        <b-form-input list="movie-list" v-model="searchItem" placeholder="영화 검색" trim ></b-form-input>

        <datalist id="movie-list" v-if="searchItem.length > 0">
          <option   v-for="(movie, index) in movies" :key="index">{{ movie.title }}</option>
        </datalist>
      </b-nav-form>

      <b-nav-item-dropdown
        id="my-nav-dropdown"
        toggle-class="nav-link-custom"
        right
        class="ms-auto p-2"
      >
        <template #button-content>
          <em style="color: white"><b-avatar></b-avatar></em>
        </template>

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
import _ from "lodash"

const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  name: "MovieNav",
  data() {
    return {
      searchItem: '',
      movies: []
    }
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
    onSubmit(){
      const movie = _.find(this.movies, movie => movie.title === this.searchItem)
      
      if(!movie) return

      this.$router.push({
        name: "MovieItem",
        params: { movie_id: movie.pk },
      })

      this.searchItem = ''
    },
  },
  created(){
    axios({
      method: 'get',
      url: `${SERVER_URL}/movies/name`
    }).then(res=>{
      this.movies = Object.freeze(res.data)
    }).catch(err => {
      console.error(err)
    })
  }
};
</script>

<style scoped>
.nav-link {
  color: white;
}
.navbar-brand {
  margin-left: 16px;
}
</style>
