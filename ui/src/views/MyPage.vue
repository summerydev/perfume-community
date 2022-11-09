<template>
  <div>
    <h1>My Page</h1>
    <div v-if="userInfo[0]">
      <div>{{ userInfo[0].user_id }}님</div>
    </div>
    <router-link to="/mypage/update">회원 정보 수정</router-link>
  </div>
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
};
</script>

<style>
</style>