<template>
  <div>
    <h1>회원 정보 수정</h1>
    <div v-if="userInfo[0]">{{ userInfo[0].user_id }}님</div>
    <form @submit.prevent="handleSubmit">
      <label for="password"
        ><input
          v-model="password"
          name="password"
          type="password"
          placeholder="your password"
          required
      /></label>
      <label for="name"
        ><input
          v-model="name"
          name="name"
          type="text"
          placeholder="your name"
          required
      /></label>
      <label for="email"
        ><input
          v-model="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
      /></label>
      <label for="phone"
        ><input
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="01030200807"
          required
      /></label>
      <button @click="handleSubmit">저장</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userid: null,
      password: null,
      name: null,
      email: null,
      phone: null,
    };
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    handleSubmit() {
      const userPkId = this.userInfo[0]?.user_id;
      const userdata = {
        userid: this.userInfo[0]?.user_id,
        password: this.password,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      console.log(userdata);
      this.$store.dispatch("updateUserInfo", [userPkId, userdata]);
    },
  },
};
</script>

<style>
</style>