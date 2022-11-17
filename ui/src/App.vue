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
    this.$store.dispatch("loginCheck");
  },
};
</script>

<style>
body {
  background-color: white;
  margin: 0 auto;
  max-width: 1280px;
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
</style>
