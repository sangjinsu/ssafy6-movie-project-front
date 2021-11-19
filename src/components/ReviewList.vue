<template>
  <div>
    <button @click="createReview">작성</button>
  </div>
</template>

<script>
export default {
  name: "ReviewList",
  methods: {
    createReview() {
      this.$emit("create-review");
    },
  },
};
</script>

<style></style>
