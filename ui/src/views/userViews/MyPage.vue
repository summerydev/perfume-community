<template>
  <div>
    <el-main>
      <div v-if="userInfo" class="userInfo">
        <h2>회원 정보</h2>
        <el-row>
          <el-col :span="4">아이디</el-col>
          <el-col :span="6">{{ userInfo.user_id }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">이름</el-col>
          <el-col :span="6">{{ userInfo.name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">이메일</el-col>
          <el-col :span="6">{{ userInfo.email }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4">전화번호</el-col>
          <el-col :span="6" v-model="phone">{{ setPhoneNumber.phone }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-link @click="$router.push('/mypage/update')" type="primary">
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
          <li
            v-for="review in myReviews"
            :key="review.id"
            @click="
              showModal = true;
              clickedReview = review;
            "
            @blur="showModal = false"
            tabindex="-1"
            ref="mymodal"
          >
            <ReviewCard :review="review"></ReviewCard>
          </li>
        </ul>
      </div>
      <div v-else>
        <div>아직 리뷰를 등록하지 않으셨군요!👀</div>
        <div>
          <el-link
            type="primary"
            @click="handleClick('/addreview')"
            size="mini"
            round
          >
            <i class="el-icon-edit"></i>
            리뷰 쓰러 가기
          </el-link>
        </div>
      </div>
      <ReviewModal
        v-if="showModal"
        @close="showModal = false"
        :review="clickedReview"
      >
      </ReviewModal>
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
import ReviewModal from "../../components/ReviewModal.vue";
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
      phone: this.userInfo?.phone,
      showModal: false,
      clickedReview: null,
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "getIsLogin",
      userInfo: "getUserInfo",
    }),
    setPhoneNumber: function () {
      const phone = this.$store.getters.getUserInfo.phone;
      const result = phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      return { phone: result };
    },
  },
  components: {
    ReviewCard,
    ReviewModal,
  },
  created() {
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
      this.$route.path == link
        ? this.$router.go("")
        : this.$router.push(`${link}`);
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

.userInfo {
  max-width: 600px;
}

.userInfo .el-row {
  padding: 8px;
}
</style>

