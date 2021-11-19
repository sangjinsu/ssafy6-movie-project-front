<template>
  <div>
    <b-container fluid>
      <b-form @submit="onSubmit" v-if="show">
        <b-row class="my-1" v-for="type in types" :key="type.id">
          <b-col sm="3">
            <label :for="`type-${type.name}`">{{ type.title }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              :id="`type-${type.name}`"
              :type="type.name"
              v-model="forms.content"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">등록</b-button>
        <b-button type="submit" variant="danger">취소</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "CreateReview",
  data() {
    return {
      forms: {
        title: null,
        content: null,
        rate: null,
      },
      types: [
        { name: "text", title: "제목" },
        { name: "text", title: "내용" },
        { name: "number", title: "점수" },
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$emit("submit-review", this.forms);
    },
  },
};
</script>

<style></style>
