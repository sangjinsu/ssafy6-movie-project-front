<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="#">Home</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Menu" right>
          <b-dropdown-item href="#">Home</b-dropdown-item>
          <b-dropdown-item href="#">Search</b-dropdown-item>
          <b-dropdown-item href="#">Recommend</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          <b-dropdown-item href="#">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Movies",
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
  },
};
</script>

<style></style>
