<template>
  <div>
    <b-navbar type="dark" variant="dark" class="nav fixed-top">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Menu" right>
          <router-link to="/movies" class="text-decoration-none"
            ><b-dropdown-item>Home</b-dropdown-item></router-link
          >
          <router-link to="/search" class="text-decoration-none"
            ><b-dropdown-item>Search</b-dropdown-item></router-link
          >
          <router-link to="/recommend" class="text-decoration-none"
            ><b-dropdown-item>Recommend</b-dropdown-item></router-link
          >
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          <b-dropdown-item href="#">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
