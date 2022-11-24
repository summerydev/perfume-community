<template>
  <div>
    <div class="tab">
      <el-link
        v-for="tab in tabList"
        :key="tab.index"
        @click="handleClick(tab)"
        class="tab"
        :class="{ active: tab.index === selectedTab }"
      >
        {{ tab.tabName }}
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
  data() {
    return {
      selectedTab: 0,
      tabList: [
        {
          index: 0,
          tabName: "전체 리뷰 보기",
          path: "/reviews/list",
        },
        {
          index: 1,
          tabName: "향수별리뷰보기",
          path: "/reviews/perfumes",
        },
      ],
    };
  },
  components: { AllReviews, PerfumeReview },
  methods: {
    handleClick(tab) {
      this.selectedTab = tab.index;
      this.$route.path == tab.path
        ? this.$router.go("")
        : this.$router.push(`${tab.path}`);
    },
  },
};
</script>

<style scoped>
.tab {
  text-align: center;
  font-size: 1rem;
  color: gray;
  margin: 0 10px;
  padding: 0 10px;
}
.tab.active {
  color: #2586ee;
}
</style>