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
  name: "CreateReview",
  data() {
    return {
      forms: {
        title: null,
        content: null,
        rank: null,
      },
      types: [
        { name: "text", title: "제목", value: this.title },
        { name: "text", title: "내용", value: this.content },
        { name: "number", title: "점수", value: this.rank },
      ],
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

    },
  },
};
</script>

<style></style>
