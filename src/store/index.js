import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('jwt'),
    token: localStorage.getItem('jwt'),
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
  },
  actions: {
    logout({ commit }) {
      commit('LOGOUT')
    },
    login({ commit }, token) {
      commit('LOGIN', token)
    },
  },
  modules: {},
})
