<template>
  <nav class="navbar">
    <el-row>
      <div v-if="this.isLogin">
        <router-link to="/mypage">
          <el-link>마이페이지</el-link>
        </router-link>
        <span> | </span>
        <el-link @click="handleLogout">로그아웃</el-link>
       
      </div>
      <div v-else>
        <router-link to="/signin"><el-link>로그인</el-link></router-link>
      </div>
    </el-row>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin" }),
  },
  methods: {
    async handleLogout() {
      this.$store.commit("logout");
      alert("로그아웃 되었습니다.");
      this.$router.go("/");
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
nav {
  float: right;
}

</style>
