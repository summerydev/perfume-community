<template>
  <div>
    <h1>회원 정보 수정</h1>
    <div v-if="userInfo">{{ userInfo.user_id }}님</div>
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="비밀번호" for="password">
        <el-input
          v-model="password"
          type="password"
          placeholder="your password"
          required
        />
      </el-form-item>
      <el-form-item label="이름" for="name">
        <el-input v-model="name" type="text" placeholder="your name" required />
      </el-form-item>
      <el-form-item label="이메일" for="email">
        <el-input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </el-form-item>
      <el-form-item label="전화번호" for="phone">
        <el-input
          v-model="phone"
          type="tel"
          placeholder="01030200807"
          required
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit">저장</el-button></el-form-item
      >
    </el-form>
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