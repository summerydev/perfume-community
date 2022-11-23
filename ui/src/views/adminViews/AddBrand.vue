<template>
  <div>
    <el-form label-width="150px" style="position: relative">
      <h1>브랜드 등록하기</h1>
      <el-form-item label="브랜드명" for="brandName">
        <el-input v-model="brandName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">작성하기</el-button>
        <router-link to="/admin"><el-button>back</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandName: null,
    };
  },
  methods: {
    async handleSubmit() {
      if (this.brandName == null || this.brandName == "") {
        alert("모든 값을 입력해주세요👀");
      } else {
        try {
          const inputData = { brandName: this.brandName };
          const result = await this.$axios.post("/brands", inputData);
          if (result.status == 200) {
            alert("등록이 완료되었습니다.");
            this.$router.push("/admin");
          }
        } catch (e) {
          console.log(e);
          alert("브랜드를 등록하지 못했어요😥");
        }
      }
    },
  },
};
</script>

<style scoped>
.el-form {
  width: 500px;
}
</style>