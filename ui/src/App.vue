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
  background-color: rgb(237, 237, 237);
}
</style>
