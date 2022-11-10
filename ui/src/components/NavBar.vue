<template>
  <nav class="navbar">
    <div v-if="this.isLogin">
      <router-link to="/mypage">👤</router-link>
      <button @click="handleLogout">로그아웃</button>
    </div>
    <div v-else>
      <router-link to="/signin">로그인</router-link>
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

<style>
</style>