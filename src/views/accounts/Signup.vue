<template>
  <div class="view">
    <!-- <span>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </span> -->

    <div class="container">
      <p style="text-align: left; font-weight: bold">회원가입</p>
      <div>
        <label for="username"></label>
        <input
          type="text"
          placeholder="이름"
          id="username"
          v-model.trim="credentials.username"
        />
      </div>

      <!-- username validation -->
      <div
        v-if="usernameValidation.errors.length > 0 && !submitted"
        class="hints"
      >
        <ul v-for="error in usernameValidation.errors" :key="error.message">
          <li>
            {{ error }}
          </li>
        </ul>
      </div>

      <div>
        <label for="password"></label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          v-model.trim="credentials.password"
        />
      </div>

      <div>
        <label for="passwordConfirmation"></label>
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="비밀번호 확인"
          v-model.trim="credentials.passwordConfirmation"
        />
      </div>

      <div
        v-if="passwordValidation.errors.length > 0 && !submitted"
        class="hints"
      >
        <ul
          v-for="error in passwordValidation.errors"
          :key="error.message"
          style="margin: 3px"
        >
          <li>
            {{ error }}
          </li>
        </ul>
      </div>

      <div class="matches" v-if="notSamePasswords">
        <p>Passwords don't match.</p>
      </div>

      <button @click="signup">계정 생성하기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "Signup",
  data: function () {
    return {
      background: { backgroundColor: "#2f3640" },
      credentials: {
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      passwordRules: [
        { message: "최소 1개 이상 소문자", regex: /[a-z]+/ },
        { message: "최소 1개 이상 대문자", regex: /[A-Z]+/ },
        { message: "최소 8자 이상", regex: /^.{8,}/ },
        { message: "최소 1개 이상 숫자", regex: /[0-9]+/ },
      ],
      usernameRules: [
        { message: "최소 8자 이상", regex: /^.{8,}/ },
        { message: "20 characters maximum.", regex: /^.{0,20}$/ },
      ],
      submitted: false,
    };
  },
  methods: {
    signup: function () {
      axios({
        method: "post",
        url: `${SERVER_URL}/accounts/signup/`,
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

<style scoped>
.view {
  height: 100vh;
}
.container {
  width: 400px;
  background-color: #26282b;
  color: white;
  padding: 20px;
  margin-top: 100px;
}
button {
  background: #c23616;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  border: none;
  border-radius: 4px;
  width: 300px;
  height: 35px;
}
.hints {
  font-size: 13px;
  text-align: left;
}
input {
  width: 300px;
  height: 35px;
  margin-bottom: 5px;
}
</style>
