<template>
  <nav>
    <div v-if="this.isLogin">
      <el-link v-if="userInfo?.id == 1" @click="handleClick('/admin/perfumes')">
        관리자페이지
      </el-link>
      <el-button v-else @click="handleClick('/addreview')" size="mini" round>
        <i class="el-icon-edit"></i>
        리뷰쓰기
      </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userInfo?.name }}님
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-link @click="handleClick('/mypage')" class="clickedLink">
              마이페이지
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link @click="handleLogout">로그아웃</el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-else>
      <el-link @click="handleClick('/signin')">로그인</el-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    async handleLogout() {
      this.$store.commit("logout");
      alert("로그아웃 되었습니다.");
      localStorage.clear();
      this.$route.path == "/" || this.$route.path == "/reviews/list"
        ? this.$router.go("")
        : this.$router.push("/");
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
nav {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
