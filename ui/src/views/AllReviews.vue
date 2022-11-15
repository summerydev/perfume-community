<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li v-for="review in this.reviewList" :key="review.id">
        <el-card
          shadow="hover"
          style="border-radius: 10px"
          :body-style="{ padding: '15px' }"
        >
          <div v-if="review.user_id == userInfo?.id">
            <i
              @click="updateConfirm(review.id)"
              class="el-icon-more-outline"
            ></i>
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
              ({{ review.user_name }}님,
              {{ review.created_date.substr(0, 10) }})
            </span>
          </div>
          <div class="img-box">
            <img v-bind:src="review.path" alt="perfume image" class="image" />
          </div>
          <div>
            <span
              v-for="item in review.fragrance"
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
        </el-card>
      </li>
    </ul>
  </div>
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
    ...mapGetters({ reviewList: "getReviewList", userInfo: "getUserInfo" }),
  },
  created() {
    this.$store.dispatch("fetchDataReviews");
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
}
.img-box {
  text-align: center;
  width: 100px;
  height: 150px;
}
.image {
  width: 100%;
  object-fit: cover;
}

.content {
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.083);
}

.fragrance {
  width: max-content;
  font-size: 0.8rem;
  padding: 3px 10px;
  border: 1px solid #bababa;
  border-radius: 20px;
}

.perfume_name {
  font-size: 1.3rem;
  font-weight: bolder;
}
</style>
