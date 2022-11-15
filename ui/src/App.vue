<template>
  <div id="app">
    <NavBar></NavBar>
    <AppHeader></AppHeader>
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
import AllReviews from "./views/reviewViews/AllReviews.vue";

export default {
  components: { AppHeader, AppFooter, NavBar, AllReviews },
  created() {
    this.$store.dispatch("loginCheck");
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

.updatebtn {
  float: right;
}

.addBtn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
