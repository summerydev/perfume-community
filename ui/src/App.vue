<template>
  <div id="app">
    <div id="wrapper">
      <NavBar></NavBar>
      <AppHeader></AppHeader>
      <main>
        <router-view>
          <AllReviews></AllReviews>
        </router-view>
      </main>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import NavBar from "./components/NavBar.vue";
import AllReviews from "./views/reviewViews/AllReviews.vue";

export default {
  components: { AppHeader, AppFooter, NavBar, AllReviews },
  created() {
    this.loginCheck();
  },
  updated() {
    this.loginCheck();
  },
  methods: {
    async loginCheck() {
      if (localStorage.accessToken) {
        const data = await this.$axios.get("/", localStorage.accessToken);
        if (data.status == 200) {
          const result = await this.$axios.put(
            `/users/login/${localStorage.userid}`
          );
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
          this.$store.commit("loginToken", { accessToken, refreshToken });
          this.$axios.defaults.headers.common["Authrization"] =
            localStorage.accessToken;
          this.$store.commit("loginSuccess", result.data.user);
        }
      }
    },
  },
};
</script>

<style>
body {
  background-color: white;
  margin: 0 auto;
  max-width: 1280px;
  overflow-x: auto;
  overflow-y: auto;
}
#wrapper {
  height: auto;
  min-height: 1000px;
  max-height: 100%;
  padding-bottom: 60px;
}
footer {
  height: 60px;
  text-align: center;
  position: relative;
  transform: translateY(-100%);
}
a {
  text-decoration: none;
}
a:link {
  text-decoration: none;
}
a:visited {
  color: #409eff;
  text-decoration: none;
}

.updatebtn {
  float: right;
}

.submitBtn {
  color: #fff;
  background-color: #409eff;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border: 1px solid #409eff;
  border-radius: 4px;
  text-align: center;
  box-sizing: border-box;
}
.submitBtn:hover {
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  outline: none;
  transition: 0.1s;
}
.msg-val {
  color: #f56c6c;
  font-size: 0.8rem;
  position: absolute;
  bottom: 1px;
  right: 5px;
}

table {
  table-layout: fixed;
  width: 100%;
}
td {
  width: max-content;
  height: max-content;
}
</style>
