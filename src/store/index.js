import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    lastestMovies: null,
    topMovies: null,
    userPK: null,
    userName: null,
  },
  getters: {
    isLogin(state) {
      return !!state.token
    },
    getLastestMovies(state) {
      if (state.lastestMovies) {
        return state.lastestMovies.slice(0, 30)
      }
      return state.lastestMovies
    },
    getTopMovies(state) {
      if (state.topMovies) {
        return state.topMovies.slice(0, 3)
      }
      return state.topMovies
    },
    getTopMoviesList(state) {
      return state.topMovies
    },
    getUserPK(state) {
      return state.userPK
    },
    getUserName(state) {
      return state.userName
    },
  },
  mutations: {
    LOGOUT(state) {
      state.token = null
      state.userPK = null
      state.userName = null
      localStorage.removeItem('jwt')
    },
    LOGIN(state, token) {
      state.token = token
      // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
      axios.defaults.headers.common['Authorization'] = `JWT ${token}`
      localStorage.setItem('jwt', token)
    },
    GET_LASTEST_MOVIES(state, lastestMovies) {
      state.lastestMovies = lastestMovies
    },
    GET_TOP_MOVIES(state, topMovies) {
      state.topMovies = topMovies
    },
    GET_USER(state, user) {
      state.userPK = user.pk
      state.userName = user.username
    },
  },
  actions: {
    logout({ commit }) {
      commit('LOGOUT')
    },
    login({ commit }, token) {
      commit('LOGIN', token)
    },
    getLastestMovies({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies',
      })
        .then((res) => commit('GET_LASTEST_MOVIES', res.data))
        .catch((err) => console.error(err))
    },
    getTopMovies({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/top',
      })
        .then((res) => commit('GET_TOP_MOVIES', res.data))
        .catch((err) => console.error(err))
    },
    getUser({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/user',
      })
        .then((res) => commit('GET_USER', res.data))
        .catch((err) => console.error(err))
    },
    checkLogin({ commit }) {
      const token = localStorage.getItem('jwt')
      if (token) {
        commit('LOGIN', token)
        if (this.state.userPK === null) {
          this.dispatch('getUser')
        }
      } else {
        commit('LOGOUT')
      }
    },
  },
  modules: {},
})
