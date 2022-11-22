<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li
        v-for="review in this.reviewList"
        :key="review.id"
        @click="
          showModal = true;
          clickedReview = review;
        "
        @blur="showModal = false"
        tabindex="-1"
        ref="mymodal"
      >
        <ReviewCard :review="review"></ReviewCard>
      </li>
    </ul>
    <ReviewModal
      v-if="showModal"
      @close="showModal = false"
      :review="clickedReview"
    >
    </ReviewModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReviewCard from "../../components/ReviewCard.vue";
import ReviewModal from "../../components/ReviewModal.vue";

export default {
  data() {
    return {
      count: 0,
      showModal: false,
      clickedReview: null,
    };
  },
  components: {
    ReviewCard,
    ReviewModal,
  },
  computed: {
    ...mapGetters({ reviewList: "getReviewList", userInfo: "getUserInfo" }),
  },
  created() {
    this.$store.dispatch("fetchDataReviews");
  },
  methods: {
    load() {
      this.count += 2;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
}
li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  width: 300px;
  height: 420px;
}
</style>
