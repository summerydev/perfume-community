<template>
  <div>
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
            <el-link @click="handleClick('/mypage/update')" type="primary">
              회원정보 수정<i class="el-icon-edit"></i>
            </el-link>
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
            <ReviewCard :review="review"></ReviewCard>
          </li>
        </ul>
      </div>
      <div v-else>아직 리뷰를 등록하지 않으셨군요!👀</div>
    </el-main>
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
import ReviewCard from "../../components/ReviewCard.vue";
export default {
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
  components: {
    ReviewCard,
  },
  created() {
    this.$store.dispatch("loginCheck");
    this.getMyReview();
  },
  methods: {
    load() {
      this.count += 2;
    },
    async getMyReview() {
      try {
        const result = await this.$axios.get(
          `/users/${localStorage.userid}/reviews/`
        );
        this.myReviews = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    handleClick(link) {
      this.$router.push(link);
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
</style>

