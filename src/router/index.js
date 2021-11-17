import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/accounts/Login.vue";
import Profile from "@/views/accounts/Profile.vue";
import Signup from "@/views/accounts/Signup.vue";
import CreateReview from "@/views/community/CreateReview.vue";
import ReviewItem from "@/views/community/ReviewItem.vue";
import MovieItem from "@/views/movies/MovieItem.vue";
import Movies from "@/views/movies/Movies.vue";
import Recommend from "@/views/movies/Recommend.vue";
import Research from "@/views/movies/Research.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "review/:review_id",
    name: "ReviewItem",
    component: ReviewItem,
  },
  {
    path: "/createreview",
    name: "CreateReview",
    component: CreateReview,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/research",
    name: "Research",
    component: Research,
  },
  {
    path: "/movies/:movie_id",
    name: "MovieItem",
    component: MovieItem,
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
