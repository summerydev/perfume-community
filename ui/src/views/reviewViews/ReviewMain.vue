<template>
  <div>
    <div class="nav">
      <el-link @click="handleClick('/reviews/list')" class="clickedLink">
        전체리뷰보기
      </el-link>
      |
      <el-link @click="handleClick('/reviews/perfumes')" class="clickedLink">
        향수별리뷰보기
      </el-link>
    </div>
    <router-view>
      <all-reviews></all-reviews>
      <perfume-review></perfume-review>
    </router-view>
  </div>
</template>

<script>
import AllReviews from "./AllReviews.vue";
import PerfumeReview from "./PerfumeReview.vue";
export default {
  components: { AllReviews, PerfumeReview },
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
.nav {
  text-align: center;
}
.el-link {
  padding: 5px;
}
</style>