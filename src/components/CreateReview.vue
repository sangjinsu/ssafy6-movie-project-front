<template>
  <div>
    <b-container>
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
            <b-form-textarea
              v-model.trim="forms.content"
              size="sm"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="my-2">
          <b-col sm="1" class="text-end">
            <label>평점</label>
          </b-col>
          <b-col sm="11">
            <b-form-input
              v-model="forms.rank"
              type="number"
              min="1"
              max="10"
              placeholder="1-10"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="2"></b-col>
          <b-col sm="10" d-flex justify-content-center>
            <b-button
              type="submit"
              variant="primary"
              class="me-2"
              >등록</b-button
            >
            <b-button type="submit" variant="danger" @click.prevent="onCancel"
              >취소</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  name: "CreateReview",
  data() {
    return {
      forms: {
        title: '',
        content: '',
        rank: null,
      },
    };
  },
  computed: {
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
        return
      }
      if (this.forms.title.length > 100){
        return
      }
      axios({
        method: "post",
        url: `${SERVER_URL}/community/${this.$route.params.movie_id}/reviews/`,
        data: {
          title: this.forms.title,
          content: this.forms.content,
          rank: this.forms.rank,
        },
      })
        .then(() => {
          this.$emit("create-review");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onCancel() {
      this.$emit("change-form");
    },
  },
};
</script>

<style></style>
