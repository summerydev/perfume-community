<template>
  <div id="app">
    <AppHeader></AppHeader>
    <NavBar></NavBar>
    <main>
      <router-view>
        <Reviews></Reviews>
      </router-view>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
import NavBar from "./components/NavBar.vue";
import Reviews from "./views/Reviews.vue";
import axios from "axios";

export default {
  components: { AppHeader, AppFooter, NavBar, Reviews },
  mounted() {
    async function loginCheck() {
      const data = await axios.get("/", localStorage.accessToken);
      if (data.status == 200) {
        const result = await axios.put(`/users/${localStorage.userid}`);
        console.log(result.data);
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("oo");
        console.log(accessToken);
        console.log(refreshToken);
        console.log(this.$router);
        console.log(this.$store);
        this.$store.commit("loginToken", [accessToken, refreshToken]);
        this.$store.commit("loginSuccess", result.data);
      }
    }
    loginCheck();
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
