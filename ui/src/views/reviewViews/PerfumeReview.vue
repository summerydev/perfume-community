<template>
  <div>
    <div>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
        <li v-for="perfume in perfumesReviews" :key="perfume.id">
          <el-card
            shadow="hover"
            style="border-radius: 10px"
            :body-style="{ padding: '15px' }"
          >
            <div>
              <span class="perfume_name">{{ perfume.perfume_name }}</span>
              <span class="brand">({{ perfume.name }})</span>
            </div>
            <div>
              <span class="recommendation"
                >👍 {{ perfume.recommendation }} ({{
                  Math.floor(
                    (perfume.recommendation / perfume.review_count) * 100
                  )
                }}%, {{ perfume.review_count }}개 리뷰)
              </span>
            </div>
            <div class="img-box">
              <img
                v-bind:src="perfume.path"
                alt="perfume image"
                class="image"
              />
            </div>
            <div>
              <el-row>지속력</el-row>
              <el-row type="flex">
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.l0)"
                  ></el-progress>
                </el-col>
                <el-col :span="6">{{ longevityMessage[0] }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.l1)"
                  ></el-progress>
                </el-col>
                <el-col :span="6">{{ longevityMessage[1] }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.l2)"
                  ></el-progress>
                </el-col>
                <el-col :span="6">{{ longevityMessage[2] }}</el-col>
              </el-row>
            </div>
            <div>
              <el-row>확산력</el-row>
              <el-row type="flex">
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.s0)"
                  ></el-progress>
                </el-col>
                <el-col :span="10">{{ strengthMessage[0] }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.s1)"
                  ></el-progress>
                </el-col>
                <el-col :span="10">{{ strengthMessage[1] }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-progress
                    :stroke-width="13"
                    :percentage="Number(perfume.s2)"
                  ></el-progress>
                </el-col>
                <el-col :span="10">{{ strengthMessage[2] }}</el-col>
              </el-row>
            </div>
          </el-card>
        </li>
      </ul>
    </div>

    <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li v-for="review in this.reviewList" :key="review.id">
        <el-card
          shadow="hover"
          style="border-radius: 10px"
          :body-style="{ padding: '15px' }"
        >
          <div>
            <span class="perfume_name">{{ review.perfume_name }}</span>
            <span class="brand">({{ review.name }})</span>
          </div>
          <div>
            <span class="recommendation">
              {{ recommendationMessage[review.recommendation] }}
            </span>
          </div>
          <div class="img-box">
            <img v-bind:src="review.path" alt="perfume image" class="image" />
          </div>
          <div>
            <span
              v-for="item in review.fragrance.replace(',', '').trim()"
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
    </ul> -->
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
} from "../../config/config.js";
export default {
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      count: 0,
      perfumesReviews: [],
    };
  },
  computed: {
    ...mapGetters({
      reviewList: "getReviewList",
      userInfo: "getUserInfo",
    }),
  },
  created() {
    this.$store.dispatch("fetchDataReviews");
    this.$store.dispatch("loginCheck");
    this.getPerfumeReviews();
  },
  methods: {
    load() {
      this.count += 2;
    },
    async getPerfumeReviews() {
      try {
        const result = await this.$axios.get("/perfumes/reviews");
        this.perfumesReviews = result.data;
      } catch (e) {
        console.log(e);
      }
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
  width: 400px;
  height: 400px;
}
</style>
