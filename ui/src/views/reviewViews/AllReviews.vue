<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li v-for="review in this.reviewList" :key="review.id">
        <ReviewCard :review="review"></ReviewCard>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ReviewCard from "../../components/ReviewCard.vue";
export default {
  data() {
    return {
      count: 0,
    };
  },
  components: {
    ReviewCard,
  },
  computed: {
    ...mapGetters({ reviewList: "getReviewList", userInfo: "getUserInfo" }),
  },
  created() {
    this.$store.dispatch("fetchDataReviews");
    this.$store.dispatch("loginCheck");
  },
  methods: {
    load() {
      this.count += 2;
    },
    updateConfirm(reviewId) {
      let updateConfirm = confirm("수정하시겠습니까?");
      if (updateConfirm) this.$router.push(`/reviews/${reviewId}`);
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  width: 270px;
  height: 400px;
}
</style>
