<template>
  <div>
    <h1>My Page</h1>
    <div>
      <div>유저 정보 : 유저 아이디, 유저 이름, 유저 이메일, 유저 전화번호</div>
      <div>유저가 작성한 리뷰</div>
      <div>리뷰 추가 버튼, 로그아웃 버튼, 회원정보 수정 버튼</div>
    </div>
    ///////////////////////
    <div v-if="userInfo">{{ userInfo.name }}님</div>
    <router-link to="/addreview" class="addBtn">추가하기</router-link>
    <el-button @click="handleLogout">로그아웃</el-button>
    <router-link to="/mypage/update">
      <el-button>회원 정보 수정</el-button>
    </router-link>
    <div>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
        <li v-for="review in this.myReveiws" :key="review.id">
          <el-card
            shadow="hover"
            style="border-radius: 10px"
            :body-style="{ padding: '15px' }"
          >
            <div>
              <span class="perfume_name">{{ review.perfume_name }}</span>
              <span class="brand">({{ review.name }})</span>
              <span class="recommendation">
                {{ recommendationMessage[review.recommendation] }}</span
              >
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
    ...mapGetters({
      isLogin: "getIsLogin",
      userInfo: "getUserInfo",
      myReveiws: "getmyReviews",
    }),
  },
  async created() {
    this.$store.dispatch("fetchMyReviews", localStorage.userid);
  },
  methods: {
    async handleLogout() {
      this.$store.commit("logout");
      alert("로그아웃 되었습니다.");
      this.$router.push("/");
      localStorage.clear();
    },
    load() {
      this.count += 2;
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
