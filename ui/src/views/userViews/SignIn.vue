<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>Login</h1>
      <label for="userid">
        <span>ID</span>
        <el-input
          type="text"
          name="userid"
          v-model="inputData.userid"
          placeholder="id"
          required
          clearable
        />
      </label>
      <label for="current-password">
        <span>Password</span>
        <el-input
          type="password"
          name="current-password"
          v-model="inputData.password"
          placeholder="password"
          required
          clearable
          show-password
        />
      </label>
      <button type="submit" style="margin-top: 20px">Login</button>
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
      inputData: {
        userid: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    async handleSubmit() {
      try {
        const result = await this.$axios.put("/users/login", this.inputData);
        if (result.status == 200) {
          const { accessToken, refreshToken } = result.data.token;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("userid", result.data.user.id);
          this.$store.commit("loginToken", result.data.token);
          this.$store.commit("loginSuccess", result.data.result);
          this.$axios.defaults.headers.common[
            "authorization"
          ] = `Bearer ${result.data.token}`;
          this.$router
            .push({
              path: "/",
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (e) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        console.log(e);
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
  width: 350px;
  margin: auto;
}
label > div {
  text-align: left;
}
input {
  border: none;
  width: 200px;
  height: 30px;
}
</style>
