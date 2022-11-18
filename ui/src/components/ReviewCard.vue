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
        v-bind:key="item"
        class="fragrance"
        :class="color[item]"
        >{{ frangranceMessage[item] }}</span
      >
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
      color: {
        0: "f-0",
        1: "f-1",
        2: "f-2",
        3: "f-3",
        4: "f-4",
        5: "f-5",
        6: "f-6",
        7: "f-7",
      },
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
.f-0 {
  background-color: rgb(252, 251, 195);
}
.f-1 {
  background-color: rgb(255, 202, 191);
}
.f-2 {
  background-color: rgb(255, 221, 228);
}
.f-3 {
  background-color: rgb(243, 136, 82);
}
.f-4 {
  background-color: rgb(255, 135, 199);
}
.f-5 {
  background-color: rgb(198, 185, 171);
}
.f-6 {
  background-color: rgb(234, 234, 224);
}
.f-7 {
  background-color: rgb(186, 221, 181);
}
</style>