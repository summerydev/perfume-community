<template>
  <div id="app">
    <AppHeader></AppHeader>
    <NavBar></NavBar>
    <main>
      <router-view>
        <AllReviews></AllReviews>
      </router-view>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import NavBar from "./components/NavBar.vue";
import AllReviews from "./views/AllReviews.vue";
import axios from "axios";

export default {
  components: { AppHeader, AppFooter, NavBar, AllReviews },
  mounted() {
    this.loginCheck();
  },
  methods: {
    async loginCheck() {
      const data = await axios.get("/", localStorage.accessToken);
      if (data.status == 200) {
        const result = await axios.put(`/user/${localStorage.userid}`);
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        this.$store.commit("loginToken", { accessToken, refreshToken });
        this.$store.commit("loginSuccess", result.data);
      }
    },
  },
};
</script>

<style>
body {
  background-color: white;
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
</style>
