<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label for="userid">
        <div>ID</div>
        <el-input
          type="text"
          name="userid"
          v-model="userid"
          placeholder="id"
          required
          clearable
      /></label>
      <label for="current-password">
        <div>Password</div>
        <el-input
          type="password"
          name="current-password"
          v-model="currentPassword"
          placeholder="password"
          required
          clearable
          show-password
      /></label>
      <el-button @click="handleSubmit" style="margin-top: 20px">Login</el-button>
    </form>
    <div>
      아직 회원이 아니신가요?
      <router-link to="/signup">
        <el-link>회원가입하러가기</el-link>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userid: "",
      currentPassword: "",
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },
  methods: {
    async handleSubmit() {
      const inputdata = {
        userid: this.userid,
        password: this.currentPassword,
      };
      try {
        const result = await this.$axios.put("/users/login", inputdata);
        if (result.status == 200) {
          console.log(result);
          const { accessToken, refreshToken } = result.data.token;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          this.$store.commit("loginToken", result.data.token);
          this.$store.commit("loginSuccess", result.data.result);
          this.$router
            .push({
              path: "/",
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (e) {
        console.log(e);
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
  margin: 10px;
}
form {
  display: flex;
  flex-direction: column;
  width:350px;
  margin: auto;
}
label > div {
  text-align: left;
}
</style>
