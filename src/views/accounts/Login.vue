<template>
  <b-container style="height: 100vh">
    <router-link
      :to="{ name: 'Signup' }"
      class="text-decoration-none text-white float-end pt-5"
    >
      <b-button class="btn-signup">Signup</b-button>
    </router-link>

    <div
      class="text-white h-100 d-flex align-items-center justify-content-center"
    >
      <div style="background-color: #26282b" class="rounded p-5 w-50">
        <div class="text-start">
          <h1 class="mb-4">로그인</h1>
        </div>
        <div class="mb-3 text-start">
          <label for="username" class="form-label">아이디</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="credentials.username"
          />
        </div>
        <div class="mb-3 text-start">
          <label for="password" class="form-label">비밀번호</label>
          <input
            type="password"
            @keyup.enter="login"
            id="password"
            v-model="credentials.password"
            class="form-control"
          />
        </div>
        <div class="d-grid gap-2">
          <b-button @click="login" class="btn-login btn-block">LOGIN</b-button>
        </div>
      </div>
    </div>
  </b-container>
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

<style scoped>
.btn-login,
.btn-login:hover,
.btn-login:active,
.btn-login:visited,
.btn-login:focus {
  background-color: #c23616;
  border-color: #c23616;
}
.btn-signup,
.btn-signup:hover,
.btn-signup:active,
.btn-signup:visited,
.btn-signup:focus {
  background-color: #757575;
  border-color: #757575;
}
</style>
