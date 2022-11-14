<template>
  <div>
    <h1>회원 정보 수정</h1>
    <div v-if="userInfo">{{ userInfo.user_id }}님</div>
    <form @submit.prevent="handleSubmit">
      <label for="password">
        <span>비밀번호</span>
        <el-input
          v-model="password"
          type="password"
          placeholder="your password"
          required
        />
      </label>
      <label for="name">
        <span>이름</span>
        <el-input v-model="name" type="text" placeholder="your name" required />
      </label>
      <label for="email">
        <span>이메일</span>
        <el-input
          v-model="email"
          type="text"
          placeholder="your email"
          required
        />
      </label>
      <label for="email">
        <span>전화번호</span>
        <el-input
          v-model="phone"
          type="text"
          placeholder="01030200807"
          required
        />
      </label>
      <button type="submit">저장</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userid: this.userInfo?.user_id,
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
      const userPkId = this.userInfo.id;
      const userdata = {
        password: this.password,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      try {
        const result = await this.$axios.put(`/users/${userPkId}`, userdata);
        if (result.status == 200) {
          alert("회원정보 수정이 완료되었습니다.");
        }
      } catch (e) {
        console.log(e);
      }
      this.$store.commit("updateUserInfo");
    },
  },
};
</script>

<style scoped>
form {
  width: 300px;
}
</style>