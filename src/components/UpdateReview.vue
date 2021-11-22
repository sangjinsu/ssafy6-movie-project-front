<template>
  <div>
    <b-container fluid>
      <b-form @submit="onSubmit">
        <b-row class="my-1">
          <b-col sm="3">
            <label>제목:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              v-model="forms.title"
              type="text"
              size="sm"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>내용:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              v-model="forms.content"
              type="text"
              size="sm"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>점수:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="forms.rank" type="number"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">등록</b-button>
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
        title: null,
        content: null,
        rank: null,
      },
    };
  },
  methods: {
    onSubmit(event) {
      console.log(this.reviewNum);
      event.preventDefault();
      if (!this.forms.title || !this.forms.content || !this.forms.rank) {
        return;
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
        .then((res) => {
          console.log(res);
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
};
</script>

<style></style>
