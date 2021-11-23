<template>
  <div>
    <span><button @click="changeForm">review작성</button></span>
    <!-- <div>
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
    </div> -->

    <swiper :options="swiperOption">
      <review-card v-for="review in reviews" :key="review.pk" :review="review">
      </review-card>
    </swiper>
  </div>
</template>

<script>
import ReviewCard from "@/components/ReviewCard.vue";
import { Swiper } from "vue-awesome-swiper";

export default {
  name: "ReviewList",
  components: { ReviewCard, Swiper },
  props: {
    reviews: Array,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 5,
        slidesPerGroup: 5,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    createReview() {
      this.$emit("create-review");
    },
    changeForm() {
      this.$emit("change-form");
    },
  },
};
</script>

<style scoped>
.card {
  opacity: 0.7;
}
</style>
