<template>
  <el-card
    shadow="hover"
    style="border-radius: 10px"
    :body-style="{ padding: '15px' }"
  >
    <div>
      <div v-if="review.user_id == userInfo?.id" class="updatebtn">
        <i @click="updateConfirm(review.id)" class="el-icon-more-outline"></i>
      </div>
      <div>
        <span class="perfume_name">{{ review.perfume_name }}</span>
        <span class="brand">({{ review.name }})</span>
      </div>
      <div>
        <span class="recommendation">
          {{ recommendationMessage[review.recommendation] }}
        </span>
        <span>
          (<span v-if="review.user_name">{{ review.user_name }}님,</span>
          {{ review.created_date.substr(0, 10) }} )
        </span>
      </div>
      <div class="img-box">
        <img v-bind:src="review.path" alt="perfume image" class="image" />
      </div>
      <div>
        <span
          v-for="item in review.fragrance.split(',')"
          v-bind:key="item.fragrance"
          class="fragrance"
        >
          {{ frangranceMessage[item] }}
        </span>
      </div>
      <div>
        지속력⏱️
        <span>{{ longevityMessage[review.longevity] }}</span>
      </div>
      <div>
        확산력✨
        <span>{{ strengthMessage[review.strength] }}</span>
      </div>
      <div>
        성별 <span>{{ genderMessage[review.gender] }}</span
        >에게 추천
      </div>
      <div>
        상세리뷰
        <div class="content">{{ review.content }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import {
  recommendationMessage,
  longevityMessage,
  strengthMessage,
  genderMessage,
  frangranceMessage,
} from "../config/config.js";
export default {
  props: { review: {} },
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      count: 0,
    };
  },
  computed: {
    ...mapGetters({ userInfo: "getUserInfo" }),
  },
};
</script>

<style>
</style>