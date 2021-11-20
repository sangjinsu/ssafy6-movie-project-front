<template>
  <div>
    <span>
      <router-link :to="{ name: 'Signup' }">Signup</router-link>
    </span>
    <h1>Login</h1>
    <div>
      <label for="username">name: </label>
      <input type="text" id="username" v-model="credentials.username" />
    </div>
    <div>
      <label for="password">password: </label>
      <input
        type="password"
        @keyup.enter="login"
        id="password"
        v-model="credentials.password"
      />
      <button @click="login">login</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Login",
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    login: function () {
      axios({
        method: "post",
        url: `${SERVER_URL}/accounts/api-token-auth/`,
        data: this.credentials,
      })
        .then((res) => {
          console.log(res);
          this.$store.dispatch("login", res.data.token);
          this.$router.push({ name: "Movies" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
