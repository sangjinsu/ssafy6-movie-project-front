<template>
  <div>
    <b-container>
      <div class="text-white text-start mb-5">
        <h1>리뷰 수정</h1>
      </div>
      <b-form @submit="onSubmit" class="text-white">
        <b-row class="my-2">
          <b-col sm="1" class="text-end">
            <label for="title-live">제목</label>
          </b-col>
          <b-col sm="11">
            <b-form-input
              id="title-live"
              v-model.trim="forms.title"
              type="text"
              placeholder="100자 이내"
              :state="titleState"
              aria-describedby="title-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="title-live-feedback">
              100자 이내
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="1" class="text-end">
            <label>내용</label>
          </b-col>
          <b-col sm="11">
            <b-form-input
              v-model.trim="forms.content"
              type="text"
              size="sm"
              max-rows="6"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="1" class="text-end">
            <label>평점</label>
          </b-col>
          <b-col sm="11">
            <b-form-input 
              v-model="forms.rank" 
              min="1"
              max="10"
              placeholder="1-10"
              type="number">
            </b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary" class="me-2">등록</b-button>
        <b-button type="submit" variant="danger" @click.prevent="onCancel"
          >취소</b-button
        >
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "UpdateReview",
  data() {
    return {
      reviewNum: `${this.$route.params.review_id}`,
      forms: {
        title: '',
        content: '',
        rank: null,
      },
    };
  },

  computed:{
    titleState(){
      if(this.forms.title.length <= 100){
        return null
      }
      return false
    }  
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.forms.title || !this.forms.content || !this.forms.rank) {
        return;
      }
      if (this.forms.title.length > 100){
        return
      }
      axios({
        method: "put",
        url: `${SERVER_URL}/community/reviews/${this.reviewNum}/`,
        data: {
          title: this.forms.title,
          content: this.forms.content,
          rank: this.forms.rank,
        },
      })
        .then(() => {
          this.$emit("update-review");
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCancel() {
      this.$router.go(-1);
    },
  },
  created() {
    axios({
      method: "get",
      url: `${SERVER_URL}/community/reviews/${this.reviewNum}/`,
    })
      .then((res) => {
        this.forms.title = res.data.title;
        this.forms.content = res.data.content;
        this.forms.rank = res.data.rank;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
