<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <li v-for="perfume in perfumesReviews" :key="perfume.id">
        <el-card
          shadow="hover"
          style="border-radius: 10px"
          :body-style="{ padding: '15px' }"
          v-if="perfume.cnt_review > 0"
        >
          <div>
            <span class="perfume_name">{{ perfume.perfume_name }}</span>
            <span class="brand">({{ perfume.brand_name }})</span>
            <span class="recommendation"
              >👍
              {{ perfume.recommendation[1] ? perfume.recommendation[1] : 0 }}
              ({{
                perfume.recommendation[1]
                  ? Math.round(
                      (perfume.recommendation[1] / perfume.cnt_review) * 100
                    )
                  : 0
              }}%, {{ perfume.cnt_review }}개 리뷰)
            </span>
          </div>
          <div class="review-box">
            <div class="img-box">
              <img
                v-bind:src="perfume.path"
                alt="perfume image"
                class="image"
              />
            </div>
            <div class="progress-box">
              <div>
                <el-row>지속력</el-row>
                <el-row
                  type="flex"
                  v-for="(el, index) in perfume.longevity"
                  :key="index"
                >
                  <span>
                    <el-col :span="10">
                      <el-progress
                        :stroke-width="10"
                        :percentage="
                          Math.round((el / perfume.cnt_review) * 100)
                        "
                      >
                      </el-progress>
                    </el-col>
                    <el-col :span="10" class="message">{{
                      longevityMessage[index]
                    }}</el-col>
                  </span>
                </el-row>
              </div>
              <div>
                <el-row>확산력</el-row>
                <el-row
                  type="flex"
                  v-for="(el, index) in perfume.strength"
                  :key="index"
                >
                  <el-col :span="10">
                    <el-progress
                      :stroke-width="10"
                      :percentage="Math.round((el / perfume.cnt_review) * 100)"
                    ></el-progress>
                  </el-col>
                  <el-col :span="10" class="message">{{
                    strengthMessage[index]
                  }}</el-col>
                </el-row>
              </div>
              <div>
                <el-row>추천 성별</el-row>
                <el-row
                  type="flex"
                  v-for="(el, index) in perfume.gender"
                  :key="index"
                >
                  <el-col :span="10">
                    <el-progress
                      :stroke-width="10"
                      :percentage="Math.round((el / perfume.cnt_review) * 100)"
                    ></el-progress>
                  </el-col>
                  <el-col :span="10" class="message">{{
                    genderMessage[index]
                  }}</el-col>
                </el-row>
              </div>
            </div>
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
    reviewLists() {
      return this.reviewList;
    },
  },
  async created() {
    await this.$store.dispatch("fetchDataReviews");
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
  flex-direction: column;
}
li {
  list-style: none;
  margin: 10px;
  background-color: white;
  border-radius: 15px;
  margin: 5px auto;
}
.el-card {
  width: max-content;
  height: max-content;
}

.el-row {
  width: 100%;
  display: inline-block;
  margin: 2px;
}

.review-box {
  display: flex;
  align-items: stretch;

  justify-content: center;
}
.img-box {
  text-align: center;
  width: 100px;
  height: 130px;
  margin-right: 20px;
}
.image {
  width: 100%;
  object-fit: cover;
}

.progress-box {
  display: flex;
  flex-direction: column;
  width: 400px;
}

.perfume_name {
  font-size: 1.1rem;
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
  overflow-x: auto;
  overflow-y: auto;
}

.message {
  color: gray;
}
</style>
