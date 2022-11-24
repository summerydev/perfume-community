<template>
  <el-card
    shadow="hover"
    style="border-radius: 10px"
    :body-style="{ padding: '15px' }"
  >
    <div v-if="review.user_id == userInfo?.id" class="updatebtn">
      <el-link type="primary" @click="updateConfirm(review.id)">수정</el-link>
    </div>
    <div class="overflow">
      <div>
        <span class="recommendation">
          {{ recommendationMessage[review.recommendation] }}
        </span>
      </div>
      <div>
        <span class="perfume_name">{{ review.perfume_name }}</span>
        <span class="brand">({{ review.name }})</span>
      </div>
    </div>
    <div>
      <span class="reviewInfo">
        <span v-if="review.user_name">{{ review.user_name }}님</span>
        |
        {{ review.created_date.substr(0, 10) }}
      </span>
    </div>
    <div class="img-box">
      <img v-bind:src="review.path" alt="perfume image" class="image" />
    </div>
    <table>
      <tr>
        <td colspan="4">
          <span
            v-for="item in review.fragrance.split(',')"
            v-bind:key="item"
            class="fragrance"
            :class="color[item]"
            style="margin-right: 3px"
            >{{ frangranceMessage[item] }}
          </span>
        </td>
      </tr>
      <tr>
        <td class="td-1">지속력</td>
        <td colspan="3">{{ longevityMessage[review.longevity] }}</td>
      </tr>
      <tr>
        <td class="td-1">확산력</td>
        <td colspan="3">{{ strengthMessage[review.strength] }}</td>
      </tr>
      <tr>
        <td class="td-1">성별</td>
        <td colspan="3">{{ genderMessage[review.gender] }}</td>
      </tr>
      <tr>
        <td class="td-1">상세리뷰</td>
      </tr>
      <tr>
        <td colspan="4">
          <div class="content">
            {{ review.content }}
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="4" style="display: none"></td>
      </tr>
    </table>
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
  width: 93%;
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.083);
  overflow-wrap: break-word;
  overflow-y: auto;
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

.td-1 {
  color: gray;
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