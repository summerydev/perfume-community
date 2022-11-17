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
  height: 100%;
}
#wrapper {
  min-height: 100%;
  padding-bottom: 60px;
}
footer {
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

.img-box {
  text-align: center;
  width: 100px;
  height: 150px;
  margin: 0 auto;
}
.image {
  width: 100%;
  object-fit: cover;
}
.content {
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.083);
  overflow: scroll;
}

.fragrance {
  width: max-content;
  font-size: 0.8rem;
  padding: 3px 10px;
  border: 1px solid #bababa;
  border-radius: 20px;
}

.perfume_name {
  font-size: 1.3rem;
  font-weight: bolder;
}
</style>
