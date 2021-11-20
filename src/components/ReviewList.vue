<template>
  <div>
    <p>
      <button @click="createReview">작성</button>
    </p>
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
import axios from "axios";

export default {
  name: "ReviewList",
  data: function () {
    return {
      Reviews: [],
    };
  },
  props: {
    reviews: [],
  },
  methods: {
    createReview() {
      this.$emit("create-review");
    },
    pushReviewItem(pk) {
      this.$router.push({
        name: "ReviewItem",
        params: { review_id: pk },
      });
    },
  },
  created() {
    axios({
      method: "get",
      url: `http://127.0.0.1:8000/community/${this.$route.params.movie_id}/reviews/`,
      headers: this.$store.getters["setToken"],
    })
      .then((res) => {
        console.log(res.data);
        // this.Reviews = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
.card {
  opacity: 0.7;
}
</style>
