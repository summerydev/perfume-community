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
export default {
  data() {
    return {
      userid: "",
      currentPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      const inputdata = {
        userid: this.userid,
        password: this.currentPassword,
      };
      try {
        this.$axios.put("/users/login", inputdata).then((res) => {
          localStorage.setItem("accessToken", res.data.token.accessToken);
          localStorage.setItem("refreshToken", res.data.token.refreshToken);
          this.$router.push("/");
        });
        // this.$store.dispatch("signin", inputdata);
      } catch (e) {
        alert(e.message);
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>