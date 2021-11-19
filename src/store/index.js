import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('jwt'),
    token: localStorage.getItem('jwt'),
    lastestMovies: null,
    topMovies: null,
  },
  getters: {
    getToken(state) {
      return state.token
    },
    isLogin(state) {
      return state.isLogin
    },
    setToken(state) {
      const config = {
        Authorization: `JWT ${state.token}`,
      }
      return config
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
  },
  mutations: {
    LOGOUT(state) {
      state.token = null
      state.isLogin = false
      localStorage.removeItem('jwt')
    },
    LOGIN(state, token) {
      state.token = token
      state.isLogin = true
      localStorage.setItem('jwt', token)
    },
    GET_LASTEST_MOVIES(state, lastestMovies) {
      state.lastestMovies = lastestMovies
    },
    GET_TOP_MOVIES(state, topMovies) {
      state.topMovies = topMovies
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
        headers: {
          Authorization: `JWT ${this.state.token}`,
        },
      })
        .then((res) => {
          commit('GET_LASTEST_MOVIES', res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getTopMovies({ commit }) {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/top',
        headers: {
          Authorization: `JWT ${this.state.token}`,
        },
      })
        .then((res) => {
          commit('GET_TOP_MOVIES', res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  modules: {},
})
