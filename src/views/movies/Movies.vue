<template>
  <div>
    <span>
      <button @click="logout">Logout</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "Movies",
  methods: {
    logout: function () {
      localStorage.removeItem("jwt");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
