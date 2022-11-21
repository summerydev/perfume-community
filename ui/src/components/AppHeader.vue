<template>
  <header>
    <h1>
      <router-link to="/"><img src="../assets/logo.png" /></router-link>
      <div class="nav">
        <el-link @click="handleClick('/allreviews')" class="clickedLink">
          전체리뷰보기
        </el-link>
        <el-link @click="handleClick('/perfumes')" class="clickedLink">
          향수별리뷰보기
        </el-link>
      </div>
    </h1>
  </header>
</template>

<script>
export default {
  methods: {
    handleClick(link) {
      this.$route.path == link
        ? this.$router.go("")
        : this.$router.push(`${link}`);
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: 100px;
  object-fit: cover;
}
.nav {
  text-align: center;
}
.el-link {
  padding: 5px;
}
</style>
