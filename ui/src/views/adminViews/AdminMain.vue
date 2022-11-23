<template>
  <div>
    <el-link @click="handleClick('/admin/perfumes')"> 향수 목록 </el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link @click="handleClick('/admin/brands')"> 브랜드 목록 </el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link @click="handleClick('/admin/addperfume')"> 향수 등록하기 </el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link @click="handleClick('/admin/addbrand')"> 브랜드 등록하기 </el-link>
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
div {
  text-align: center;
}
</style>