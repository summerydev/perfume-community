<template>
  <div>
    <h1>my reviews</h1>
    <router-link to="/addreview" class="addBtn">추가하기</router-link>
    <div>
      <li v-for="review in this.reviewList" :key="review.id">
        <div>{{ review.perfume_name }}</div>
        <div>{{ review.name }}</div>
        <div>{{ review.recommendation == "1" ? "추천해요" : "아쉬워요" }}</div>
        <div>
          지속력⏱️
          <span v-if="review.longevity == 0">{{ longevityMessage[0] }}</span>
          <span v-else-if="review.longevity == 1">{{
            longevityMessage[1]
          }}</span>
          <span v-else>{{ longevityMessage[2] }}</span>
        </div>
        <div>
          확산력✨
          <span v-if="review.strength == 0">{{ strengthMessage[0] }}</span>
          <span v-else-if="review.longevity == 1">{{
            strengthMessage[1]
          }}</span>
          <span v-else>{{ strengthMessage[2] }}</span>
        </div>
        <div>
          for
          <span v-if="review.gender == 0">{{ genderMessage[0] }} </span>
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
export default {
  data() {
    return {
      longevityMessage: ["짧아요", "괜찮아요", "오래가요"],
      strengthMessage: ["나만 맡을 수 있어요", "지하철 가능!", "강력해요"],
      genderMessage: ["둘 다", "남성", "여성"],
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