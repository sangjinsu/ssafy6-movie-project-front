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
              v-model.trim="forms.title"
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
            <b-form-textarea
              v-model.trim="forms.content"
              size="sm"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label>평점:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              v-model="forms.rank"
              type="number"
              min="1"
              max="10"
              placeholder="1-10"
            ></b-form-input>
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
  name: "CreateReview",
  data() {
    return {
      forms: {
        title: null,
        content: null,
        rank: null,
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (!this.forms.title || !this.forms.content || !this.forms.rank) {
        return;
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
        .then((res) => {
          console.log(res);
          this.$emit("create-review");
          this.forms = "";
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
