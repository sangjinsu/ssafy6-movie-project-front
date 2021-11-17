<template>
  <div class="home">
    <span>
      <router-link :to="{ name: 'Signup' }">Signup</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
