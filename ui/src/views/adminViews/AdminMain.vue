<template>
  <div>
    <div>
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
      <perfume-list></perfume-list>
      <brand-list></brand-list>
      <add-brand></add-brand>
      <add-perfume></add-perfume>
    </router-view>
  </div>
</template>

<script>
import AddBrand from "./AddBrand.vue";
import AddPerfume from "./AddPerfume.vue";
import BrandList from "./BrandList.vue";
import PerfumeList from "./PerfumeList.vue";
export default {
  components: { AddPerfume, AddBrand, PerfumeList, BrandList },
  data() {
    return {
      selectedTab: 0,
      tabList: [
        {
          index: 0,
          tabName: "향수 목록",
          path: "/admin/perfumes",
        },
        {
          index: 1,
          tabName: "브랜드 목록",
          path: "/admin/brands",
        },
        {
          index: 2,
          tabName: "향수 등록",
          path: "/admin/addperfume",
        },
        {
          index: 3,
          tabName: "브랜드 등록",
          path: "/admin/addbrand",
        },
      ],
    };
  },
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
div {
  text-align: center;
}
.tab {
  font-size: 1rem;
  color: gray;
  margin: 0 10px;
  padding: 0 10px;
}
.tab.active {
  color: #2586ee;
}
</style>