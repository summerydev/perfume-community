<template>
  <div>
    <el-form label-width="150px" style="position: relative">
      <h1>향수 수정하기</h1>
      <el-form-item label="브랜드명" for="brandName">
        <el-input v-model="searchKey" @input="searchBrand"></el-input>
        <div v-show="isShow" class="searchBox" style="position: absolute">
          <el-card>
            <div
              v-for="brand in searchResult"
              :key="brand.id"
              @click="selectBrand(brand)"
            >
              <span v-if="brand.id">{{ brand.name }}</span>
            </div>
          </el-card>
        </div>
      </el-form-item>
      <el-form-item label="향수 상품명">
        <el-input v-model="perfume.perfume_name"></el-input>
      </el-form-item>
      <el-form-item label="이미지 경로">
        <el-input v-model="perfume.path"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkInputData">작성하기</el-button>
        <router-link to="/admin"><el-button>back</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perfume: {},
      inputData: {
        id: this.$route.params.id,
        brandId: this.perfume?.brand_id,
        perfumeName: null,
        path: null,
      },
      brandId: null,
      brandName: null,
      searchKey: null,
      searchResult: [],
      isShow: false,
    };
  },
  updated() {
    this.inputData = {
      perfumeName: this.perfume.perfume_name,
      path: this.perfume.path,
      brandId: this.brandId,
    };
  },
  mounted() {
    this.getOnePerfume();
  },
  methods: {
    async getOnePerfume() {
      try {
        const result = await this.$axios.get(
          `/perfumes/${this.$route.params.id}`
        );
        if (result.data != null) {
          this.perfume = result.data;
          this.searchKey = result.data.name;
        } else if (result.data.length == 0) {
          alert("error");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async searchBrand() {
      if (this.searchKey == "") {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.searchResult = [];
        try {
          const result = await this.$axios.get(`/brands/${this.searchKey}`);
          if (result.data.length > 0) {
            this.searchResult = result.data;
          } else if (result.data.length == 0) {
            this.searchResult.push("검색결과 없음");
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    selectBrand(brand) {
      this.searchKey = brand.name;
      this.searchResult = [];
      this.brandId = brand.id; //
      this.isShow = false;
    },
    checkInputData() {
      const isInit = Object.values(this.inputData).every(
        (el) => el !== "" && el != null
      );
      isInit
        ? this.handleSubmit(this.inputData)
        : alert("모든 값을 입력해주세요👀");
    },
    async handleSubmit(inputData) {
      try {
        const result = await this.$axios.put(
          `/perfumes/${this.$route.params.id}`,
          inputData
        );
        if (result.data.ok) {
          alert("등록이 완료되었습니다.");
          this.$router.push("/admin");
        }
      } catch (e) {
        console.log(e);
        alert("향수를 수정하지 못했어요😥");
      }
    },
  },
};
</script>

<style>
form {
  width: 700px;
  margin: auto;
}
.searchBox {
  width: 300px;
  max-height: 150px;
  overflow: scroll;
  z-index: 1;
}
.el-form {
  width: 500px;
}
.el-form-item__label {
  width: fit-content;
}
</style>