<template>
  <nav class="navbar">
    <router-link to="/mypage">👤</router-link>
    <router-link to="/signin">로그인</router-link>
    <button @click="handleLogout">로그아웃</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLogout() {},
  },
};
</script>

<style>
</style>