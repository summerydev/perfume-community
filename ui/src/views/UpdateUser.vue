<template>
  <div>
    <h1>회원 정보 수정</h1>
    <div v-if="userInfo[0]">{{ userInfo[0].user_id }}님</div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="password"
          >비밀번호
          <input
            v-model="password"
            name="password"
            type="password"
            placeholder="your password"
            required
        /></label>
      </div>
      <div>
        <label for="name"
          >이름<input
            v-model="name"
            name="name"
            type="text"
            placeholder="your name"
            required
        /></label>
      </div>
      <div>
        <label for="email"
          >이메일<input
            v-model="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
        /></label>
      </div>
      <div>
        <label for="phone"
          >전화번호<input
            v-model="phone"
            name="phone"
            type="tel"
            placeholder="01030200807"
            required
        /></label>
      </div>
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
    async handleSubmit() {
      const userPkId = this.userInfo[0]?.id;
      const userdata = {
        password: this.password,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      try {
        await this.$axios.put("/users", {
          params: { userPkId },
          body: userdata,
        });
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("updateUserInfo");
    },
  },
};
</script>

<style>
</style>