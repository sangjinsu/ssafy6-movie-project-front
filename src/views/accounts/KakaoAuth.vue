<template>
  <div></div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
    name: "KakaoAuth",
    created(){
      const {query: {
        code
      }} = this.$router.currentRoute
      
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/kakao/login/callback/`,
        data: {
          code 
        }
      }).then(res => {
        this.$store.dispatch("login", res.data);
        this.$router.push({ name: "Movies" });
      }).catch(err => {
        console.error(err)
      })
    }
}
</script>