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
    handleLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
</style>