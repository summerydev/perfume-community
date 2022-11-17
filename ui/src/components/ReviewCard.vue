<template>
  <el-card
    shadow="hover"
    style="border-radius: 10px"
    :body-style="{ padding: '15px' }"
  >
    <div v-if="review.user_id == userInfo?.id" class="updatebtn">
      <i @click="updateConfirm(review.id)" class="el-icon-more-outline"></i>
    </div>
    <div class="overflow">
      <div>
        <span class="recommendation">
          {{ recommendationMessage[review.recommendation] }}
        </span>
        <span class="reviewInfo">
          <span v-if="review.user_name">{{ review.user_name }}님</span>
          |
          {{ review.created_date.substr(0, 10) }}
        </span>
      </div>
      <div>
        <span class="perfume_name">{{ review.perfume_name }}</span>
        <span class="brand">({{ review.name }})</span>
      </div>
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
    <!-- <el-row>
      <el-col :span="8">지속력⏱️</el-col>
      <el-col :span="16">{{ longevityMessage[review.longevity] }}</el-col>
    </el-row> -->
    <div>
      지속력⏱️
      <span>{{ longevityMessage[review.longevity] }}</span>
    </div>
    <div>
      확산력✨
      <span>{{ strengthMessage[review.strength] }}</span>
    </div>
    <div>
      성별
      <span>{{ genderMessage[review.gender] }}</span
      >에게 추천
    </div>
    <div>
      상세리뷰
      <div class="content">{{ review.content }}</div>
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
  methods: {
    updateConfirm(reviewId) {
      let updateConfirm = confirm("수정하시겠습니까?");
      if (updateConfirm) this.$router.push(`/reviews/${reviewId}`);
    },
  },
};
</script>

<style scoped>
.overflow div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-row {
  width: 100%;
  display: inline-block;
}

.recommendation {
  font-size: 1.3rem;
  font-weight: bolder;
}
.reviewInfo {
  font-size: 0.8rem;
  color: gray;
}

.perfume_name {
  font-size: 1rem;
  font-weight: bolder;
}

.fragrance {
  width: max-content;
  font-size: 0.8em;
  padding: 2px 7px;
  border: 1px solid #bababa;
  border-radius: 20px;
  text-align: center;
}

.content {
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.083);
  overflow-y: scroll;
}

.img-box {
  text-align: center;
  width: 100px;
  height: 150px;
  margin: 0 auto;
}
.image {
  width: 100%;
  object-fit: cover;
}
</style>