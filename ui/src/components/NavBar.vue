<template>
  <nav class="navbar">
    <el-row>
      <div v-if="this.isLogin">
        <router-link to="/mypage"
          ><el-button>마이페이지</el-button></router-link
        >
        <el-button @click="handleLogout">로그아웃</el-button>
      </div>
      <div v-else>
        <router-link to="/signin"><el-button>로그인</el-button></router-link>
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
      localStorage.clear();
      try {
        if (this.$router.currentRoute.path !== "/reviews") {
          this.$router.push("/");
        } else {
          this.$router.go();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
nav {
  float: right;
}
</style>
