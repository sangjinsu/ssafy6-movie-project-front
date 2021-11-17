<template>
  <div>
    <span>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </span>
    <h1>Signup</h1>
    <div>
      <label for="username">name: </label>
      <input type="text" id="username" v-model.trim="credentials.username" />
    </div>

    <!-- username validation -->
    <div
      v-if="usernameValidation.errors.length > 0 && !submitted"
      class="hints"
    >
      <p v-for="error in usernameValidation.errors" :key="error.message">
        {{ error }}
      </p>
    </div>

    <div>
      <label for="password">password: </label>
      <input
        type="password"
        id="password"
        v-model.trim="credentials.password"
      />
    </div>

    <div>
      <label for="passwordConfirmation">password check: </label>
      <input
        type="password"
        id="passwordConfirmation"
        v-model.trim="credentials.passwordConfirmation"
        @keyup.enter="signup"
      />
    </div>

    <div
      v-if="passwordValidation.errors.length > 0 && !submitted"
      class="hints"
    >
      <h2>Hints</h2>
      <p v-for="error in passwordValidation.errors" :key="error.message">
        {{ error }}
      </p>
    </div>

    <div class="matches" v-if="notSamePasswords">
      <p>Passwords don't match.</p>
    </div>

    <button
      @click="signup"
      v-if="
        passwordsFilled &&
        !notSamePasswords &&
        passwordValidation.valid &&
        usernameValidation.valid
      "
    >
      Signup
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data: function () {
    return {
      credentials: {
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      passwordRules: [
        { message: "One lowercase letter required.", regex: /[a-z]+/ },
        { message: "One uppercase letter required.", regex: /[A-Z]+/ },
        { message: "8 characters minimum.", regex: /^.{8,}/ },
        { message: "One number required.", regex: /[0-9]+/ },
      ],
      usernameRules: [
        { message: "8 characters minimum.", regex: /^.{8,}/ },
        { message: "20 characters maximum.", regex: /^.{0,20}$/ },
      ],
      submitted: false,
    };
  },
  methods: {
    signup: function () {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/accounts/signup/",
        data: this.credentials,
      })
        .then(() => {
          // console.log(res);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    notSamePasswords() {
      if (this.passwordsFilled) {
        return (
          this.credentials.password !== this.credentials.passwordConfirmation
        );
      } else {
        return false;
      }
    },
    passwordsFilled() {
      return (
        this.credentials.password !== "" &&
        this.credentials.passwordConfirmation !== ""
      );
    },
    passwordValidation() {
      const errors = [];
      for (const condition of this.passwordRules) {
        if (!condition.regex.test(this.credentials.password)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
    usernameValidation() {
      let errors = [];
      for (const condition of this.usernameRules) {
        if (!condition.regex.test(this.credentials.username)) {
          errors.push(condition.message);
        }
      }
      if (errors.length === 0) {
        return { valid: true, errors };
      } else {
        return { valid: false, errors };
      }
    },
  },
};
</script>

<style></style>
