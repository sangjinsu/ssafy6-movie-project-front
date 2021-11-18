import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/accounts/Login.vue'
import Profile from '@/views/accounts/Profile.vue'
import Signup from '@/views/accounts/Signup.vue'
import CreateReview from '@/views/community/CreateReview.vue'
import ReviewItem from '@/views/community/ReviewItem.vue'
import MovieItem from '@/views/movies/MovieItem.vue'
import Movies from '@/views/movies/Movies.vue'
import Recommend from '@/views/movies/Recommend.vue'
import Research from '@/views/movies/Research.vue'
import MovieList from '@/views/movies/MovieList.vue'

import store from '../store'

const beforeAuth = (isAuth) => (from, to, next) => {
  const isLogin = store.getters['isLogin']
  if ((isLogin && isAuth) || (!isLogin && !isAuth)) {
    return next()
  } else {
    // 회원가입 화면으로 이동
    next('/signup')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/review/:review_id',
    name: 'ReviewItem',
    component: ReviewItem,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/createreview',
    name: 'CreateReview',
    component: CreateReview,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/list',
    name: 'MoviesList',
    component: MovieList,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/research',
    name: 'Research',
    component: Research,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/movies/:movie_id',
    name: 'MovieItem',
    component: MovieItem,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/*',
    name: 'Extra',
    component: Home,
    beforeEnter: beforeAuth(false),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
