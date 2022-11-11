<template>
  <div>
    <h1>My Page</h1>
    <div v-if="userInfo[0]">
      <div>{{ userInfo[0].user_id }}님</div>
    </div>

    <router-link to="/addreview" class="addBtn">추가하기</router-link>
    <el-button @click="handleLogout">로그아웃</el-button>
    <router-link to="/mypage/update">
      <el-button>회원 정보 수정</el-button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLogin: "getIsLogin",
      userInfo: "getUserInfo",
      reviewlist: "getReviewList",
    }),
  },
  methods: {
    async handleLogout() {
      this.$store.commit("logout");
      alert("로그아웃 되었습니다.");
      this.$router.push("/");
      localStorage.clear();
      //this.$axios.default.headers.common["athorization"] = null;
    },
  },
};
</script>

<style>
</style>