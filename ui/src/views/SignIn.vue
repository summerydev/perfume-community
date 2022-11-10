<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label for="userid">
        <div>ID</div>
        <input
          type="text"
          name="userid"
          v-model="userid"
          placeholder="id"
          required
      /></label>
      <label for="current-password">
        <div>Password</div>
        <input
          type="password"
          name="current-password"
          v-model="currentPassword"
          placeholder="password"
          required
      /></label>
      <button>Login</button>
    </form>
    <div>
      아직 회원이 아니신가요?
      <router-link to="/signup">회원가입하러가기</router-link>
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

<style>
</style>