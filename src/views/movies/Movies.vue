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
      this.$store.dispatch('logout')
      this.$router.push({name: 'Signup'})
    },
  },
};
</script>

<style></style>
