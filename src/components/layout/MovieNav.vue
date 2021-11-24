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

const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  name: "MovieNav",
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
.nav-link {
  color: white;
}
.navbar-brand {
  margin-left: 16px;
}
</style>
