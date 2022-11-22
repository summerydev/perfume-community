<template>
  <div>
    <el-link @click="handleClick('/admin/perfumes')">
      등록된 향수 목록
    </el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link @click="handleClick('/admin/addperfume')"> 향수 등록하기 </el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link @click="handleClick('/admin/addbrand')"> 브랜드 등록하기 </el-link>
    <router-view>
      <perfume-list></perfume-list>
      <add-brand></add-brand>
      <add-perfume></add-perfume>
    </router-view>
  </div>
</template>

<script>
import AddBrand from "./AddBrand.vue";
import AddPerfume from "./AddPerfume.vue";
import PerfumeList from "./PerfumeList.vue";
export default {
  components: { AddPerfume, AddBrand, PerfumeList },
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