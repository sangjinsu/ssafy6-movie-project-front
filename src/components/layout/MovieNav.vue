<template>
  <b-navbar type="dark" variant="dark" class="nav">
    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/movies" class="text-decoration-none"
          >Home</router-link
        >
      </b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Menu" right>
        <b-dropdown-item
          ><router-link to="/movies" class="text-decoration-none"
            >Home</router-link
          ></b-dropdown-item
        >
        <b-dropdown-item
          ><router-link to="/research" class="text-decoration-none"
            >Search</router-link
          ></b-dropdown-item
        >
        <b-dropdown-item
          ><router-link to="/recommend" class="text-decoration-none"
            >Recommend</router-link
          ></b-dropdown-item
        >
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="/profile">Profile</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        <b-dropdown-item href="#">Sign out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
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
