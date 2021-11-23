<template>
  <div>
    <span><button @click="changeForm">review작성</button></span>
    <div>
      <b-card-group deck>
        <b-row>
          <b-card
            style="max-width: 20rem"
            bg-variant="dark"
            header="Dark"
            text-variant="white"
            class="text-center"
            v-for="review in reviews"
            :key="review.pk"
            @click="pushReviewItem(review.pk)"
          >
            <b-card-text>
              {{ review.title }}
              {{ review.content }}
              {{ review.rank }}
            </b-card-text>
          </b-card>
        </b-row>
      </b-card-group>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReviewList",
  
  props: {
    reviews: Array,
  },
  methods: {
    createReview() {
      this.$emit("create-review");
    },
    changeForm() {
      this.$emit('change-form')
    },
    pushReviewItem(pk) {
      this.$router.push({
        name: "ReviewItem",
        params: { review_id: pk },
      });
    },
  }
}
</script>

<style scoped>
.card {
  opacity: 0.7;
}
</style>
