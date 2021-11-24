<template>
  <swiper-slide>
    <div class="card-group" style="height: 15rem;">
      <div
        class="card text-white bg-dark"
        @click="pushReviewItem(review.pk)"
      >
        <div class="card-header">★  {{ review.rank }}</div>
        <div class="card-body">
          <h5 class="card-title">
            <p class="fs-5">{{ sliceTitle }}</p>
          </h5>
          <p class="card-text">
            {{ sliceContent }}
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
  computed: {
    sliceTitle(){
      return this.review.title.length > 20 ?  this.review.title.slice(0, 17) +'...' : this.review.title
    },
    sliceContent(){
      return this.review.content.length > 100 ?  this.review.content.slice(0, 97) +'...' : this.review.content
    }
  },
  methods: {
    pushReviewItem(pk) {
      this.$router.push({
        name: "ReviewItem",
        params: { review_id: pk },
      });
    },
  },
};
</script>

<style></style>
