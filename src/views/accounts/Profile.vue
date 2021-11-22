
<template>
  <b-container v-if="profile">  
    <h2>{{profile.username}}</h2>
    <h4>리뷰 개수: {{profile.reviews.length}}</h4>
    <h4>댓글 개수: {{profile.comments.length}}</h4>
    
    <div>
      <h4>찜한 영화</h4>
      <ul>
       <movie-image-list :movieList="profile.pick_movies"></movie-image-list>
      </ul>
    </div>  
    
    <div>
      <h4>좋아요한 영화</h4>
      <ul>
        <movie-image-list :movieList="profile.like_movies"></movie-image-list>
      </ul>
    </div>
  
    <div>
      <h4>리뷰</h4>
      <ul>
        <li v-for="(review, index) in profile.reviews" :key="index">{{review}}</li>
      </ul>
    </div>

    <div>
      <h4>댓글</h4>
      <ul>
        <li v-for="(comment, index) in profile.comments" :key="index">{{comment}}</li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

import MovieImageList from "@/components/MovieImageList.vue";

export default {
  name: "Profile",
  components: {
    MovieImageList
  },
  data() {
    return {
      profile: null 
    }
  },
  created() {
    axios({
      method: 'get',
      url: `${SERVER_URL}/accounts/profile`
    })
      .then(res => this.profile = res.data)
      .catch(err => console.error(err))
  }
};
</script>

<style></style>
