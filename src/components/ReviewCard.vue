<template>
  <swiper-slide>
    <div class="card-group">
      <div
        class="card text-white bg-dark mb-3 h-100"
        @click="pushReviewItem(review.pk)"
      >
        <div class="card-header">★: {{ this.review.rank }}</div>
        <div class="card-body">
          <h5 class="card-title">
            <small>제목: </small>{{ this.review.title }}
          </h5>
          <p class="card-text">
            <small>내용: </small>{{ this.review.content }}
          </p>
        </div>
      </div>
    </div>
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "ReviewCard",
  components: {
    SwiperSlide,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pushReviewItem(pk) {
      console.log("ok");
      this.$router.push({
        name: "ReviewItem",
        params: { review_id: pk },
      });
    },
  },
};
</script>

<style></style>
