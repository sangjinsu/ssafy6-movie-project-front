import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

const beforeAuth = (isAuth) => (to, from, next) => {
  store.dispatch('checkLogin')
  const isLogin = store.getters['isLogin']

  if (
    isLogin &&
    (to.name === 'Home' || to.name === 'Login' || to.name === 'Signup')
  ) {
    return next('/movies')
  }
  if ((isLogin && isAuth) || (!isLogin && !isAuth)) {
    return next()
  } else {
    // 회원가입 화면으로 이동
    next('/login')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/accounts/Signup.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Home.vue'),
    beforeEnter: beforeAuth(false),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/accounts/Profile.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/review/:review_id',
    name: 'ReviewItem',
    component: () => import('@/views/community/ReviewItem.vue'),
    props: true,
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/createreview',
    name: 'CreateReview',
    component: () => import('@/components/CreateReview.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/updatereview/:review_id',
    name: 'UpdateReview',
    component: () => import('@/components/UpdateReview.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('@/views/movies/Movies.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('@/views/movies/Research.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/movies/:movie_id',
    name: 'MovieItem',
    component: () => import('@/views/movies/MovieItem.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/movies/Recommend.vue'),
    beforeEnter: beforeAuth(true),
  },
  {
    path: '/*',
    name: 'Extra',
    component: () => import('@/views/Home.vue'),
    beforeEnter: beforeAuth(false),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
