<template>
  <b-container style="height: 100vh">
    <router-link
      :to="{ name: 'Login' }"
      class="text-decoration-none text-white float-end"
    >
      <b-button class="btn-login">Login</b-button>
    </router-link>
    <div
      class="text-white h-100 d-flex align-items-center justify-content-center"
    >
      <div class="position-absolute top-0 start-50 translate-middle-x pt-3">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>
      <div style="background-color: #26282b" class="rounded p-5 w-50">
        <div>
          <div class="text-start">
            <h1>회원가입</h1>
          </div>

          <div class="mb-3 text-start">
            <label for="username"></label>
            <input
              type="text"
              placeholder="아이디"
              id="username"
              v-model.trim="credentials.username"
              class="form-control"
            />
          </div>

          <!-- username validation -->
          <div v-if="usernameValidation.errors.length > 0 && !submitted">
            <ul
              class="list-unstyled"
              v-for="error in usernameValidation.errors"
              :key="error.message"
            >
              <li>
                {{ error }}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div class="text-start">
            <label for="password"></label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              v-model.trim="credentials.password"
              class="form-control"
            />
          </div>

          <div class="mb-3 text-start">
            <label for="passwordConfirmation"></label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="비밀번호 확인"
              v-model.trim="credentials.passwordConfirmation"
              class="form-control"
            />
          </div>

          <div v-if="passwordValidation.errors.length > 0 && !submitted">
            <ul
              v-for="error in passwordValidation.errors"
              :key="error.message"
              class="list-unstyled"
            >
              <li>
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="matches" v-if="notSamePasswords">
            <p>비밀번호가 일치하지 않습니다</p>
          </div>
        </div>

        <div class="d-grid">
          <b-button
            v-if="
              passwordsFilled &&
              !notSamePasswords &&
              passwordValidation.valid &&
              usernameValidation.valid
            "
            @click="signup"
            class="btn-signup btn-block"
            >계정 생성하기</b-button
          >
        </div>
      </div>
    </div>
  </b-container>
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
.btn-login,
.btn-login:hover,
.btn-login:active,
.btn-login:visited,
.btn-login:focus {
  background-color: #757575;
  border-color: #757575;
  color: white;
  border: none;
}
.btn-signup,
.btn-signup:hover,
.btn-signup:active,
.btn-signup:visited,
.btn-signup:focus {
  background-color: #c23616;
  border-color: #c23616;
  color: white;
  border: none;
}
</style>
