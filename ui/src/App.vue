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

export default {
  components: { AppHeader, AppFooter, NavBar, Reviews },
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
  color:#409eff;
  text-decoration: none;
}

</style>
