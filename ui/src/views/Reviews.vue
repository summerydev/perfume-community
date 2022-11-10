<template>
  <div>
    <h1>my reviews</h1>
    <router-link to="/addreview" class="addBtn">추가하기</router-link>
    <div>
      <li v-for="review in this.reviewList" :key="review.id">
        <div>{{ review.perfume_name }}</div>
        <div>{{ review.name }}</div>
        <div>{{ recommendationMessage[review.recommendation] }}</div>
        <div>
          지속력⏱️
          <span>{{ longevityMessage[review.longevity] }}</span>
        </div>
        <div>
          확산력✨
          <span>{{ strengthMessage[review.strength] }}</span>
        </div>
        <div>
          <span>{{ genderMessage[review.gender] }}</span>에게 추천
        </div>
        <div>
          <span v-for="item in review.fragrance" v-bind:key="item.fragrance">{{
            item
          }}</span>
        </div>
        <div>{{ review.content }}</div>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  recommendationMessage,
  longevityMessage,
  strengthMessage,
  genderMessage,
} from "../config/config.js";
export default {
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
    };
  },
  computed: {
    ...mapGetters({ reviewList: "getReviewList" }),
  },
  created() {
    this.$store.dispatch("fetchDataReviews");
  },
};
</script>

<style>
li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
}
</style>