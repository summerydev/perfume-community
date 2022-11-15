<template>
  <div>
    <AddReviewBtn></AddReviewBtn>
    <el-main>
      <div v-if="userInfo">
        <h2>회원 정보</h2>
        <el-row>
          <el-col :span="4">아이디</el-col>
          <el-col :span="8">{{ userInfo.user_id }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">이름</el-col>
          <el-col :span="8">{{ userInfo.name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">이메일</el-col>
          <el-col :span="8">{{ userInfo.email }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">전화번호</el-col>
          <el-col :span="8">{{ userInfo.phone }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <router-link to="/mypage/update">
              <el-link type="primary">
                회원정보 수정<i class="el-icon-edit"></i>
              </el-link>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <h2>내가 작성한 리뷰</h2>
      <div v-if="myReviews && myReviews.length > 0">
        <ul
          class="infinite-list"
          v-infinite-scroll="load"
          style="overflow: auto"
        >
          <li v-for="review in myReviews" :key="review.id">
            <el-card
              shadow="hover"
              style="border-radius: 10px"
              :body-style="{ padding: '15px' }"
              ><div>
                <div class="updatebtn">
                  <i
                    @click="updateConfirm(review.id)"
                    class="el-icon-more-outline"
                  ></i>
                </div>
              </div>
              <div>
                <span class="perfume_name">{{ review.perfume_name }}</span>
                <span class="brand">({{ review.name }})</span>
                <span class="recommendation">
                  {{ recommendationMessage[review.recommendation] }}</span
                >
              </div>
              <div class="img-box">
                <img
                  v-bind:src="review.path"
                  alt="perfume image"
                  class="image"
                />
              </div>
              <div>
                <span
                  v-for="item in review.fragrance.trim().replace(',', '')"
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
      <div v-else>아직 리뷰를 등록하지 않으셨군요!👀</div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddReviewBtn from "../../components/AddReviewBtn.vue";
import {
  recommendationMessage,
  longevityMessage,
  strengthMessage,
  genderMessage,
  frangranceMessage,
} from "../../config/config.js";
export default {
  components: {
    AddReviewBtn,
  },
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      count: 0,
      myReviews: [],
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "getIsLogin",
      userInfo: "getUserInfo",
    }),
  },
  async created() {
    this.$store.dispatch("loginCheck");
    try {
      const result = await this.$axios.get(
        `/users/${localStorage.userid}/reviews/`
      );
      this.myReviews = result.data;
    } catch (e) {
      console.log(e);
    }
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
