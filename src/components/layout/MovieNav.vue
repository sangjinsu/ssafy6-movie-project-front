<template>
  <div>
    <b-nav
      small
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
      <!-- <b-form style="text-align: center">
        <b-form-input></b-form-input>
      </b-form> -->

      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="User"
        toggle-class="nav-link-custom"
        right
        class="ms-auto p-2 bd-highlight"
      >
        <b-dropdown-item @click="logout">로그아웃</b-dropdown-item>
        <b-dropdown-item href="/profile">프로필</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">회원탈퇴</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "MovieNav",
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
a.nav-link {
  color: white;
}
.navbar-brand {
  margin-left: 16px;
}
</style>
