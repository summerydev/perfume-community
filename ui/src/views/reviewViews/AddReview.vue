<template>
  <div>
    <h1>리뷰 등록하기</h1>
    <el-form label-width="150px" style="position: relative">
      <el-form-item label="제품명" for="perfumeName">
        <el-input v-model="searchKey" @input="searchPerfume"></el-input>
        <div v-show="isShow" class="searchBox" style="position: absolute">
          <el-card>
            <div
              v-for="perfume in searchResult"
              :key="perfume.id"
              @click="selectPerfume(perfume)"
            >
              {{ perfume.perfume_name ? perfume.perfume_name : perfume }}
            </div>
          </el-card>
        </div>
      </el-form-item>
      <el-form-item label="어땠나요?" for="inputValues.recommendation">
        <el-radio-group
          v-model="inputValues.recommendation"
          size="small"
          required
        >
          <el-radio-button
            v-for="(item, index) in recommendationMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="오래 지속되나요?" for="inputValues.longevity"
        ><el-radio-group v-model="inputValues.longevity" size="small">
          <el-radio-button
            v-for="(item, index) in longevityMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="향이 얼마나 느껴지나요?" for="inputValues.strength"
        ><el-radio-group v-model="inputValues.strength" size="small">
          <el-radio-button
            v-for="(item, index) in strengthMessage"
            :key="index"
            :label="index"
            >{{ item }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="어떤 향이 느껴지나요?" for="fragranceValue">
        <el-checkbox-group v-model="fragranceValue" size="small">
          <el-checkbox-button
            v-for="(item, index) in frangranceMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="누구에게 추천하나요?" for="inputValues.gender">
        <el-radio-group v-model="inputValues.gender" size="small">
          <el-radio-button
            v-for="(item, index) in genderMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="리뷰를 작성해주세요." for="inputValues.content"
        ><el-input type="textarea" :rows="2" v-model="inputValues.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkInputData">작성하기</el-button>
        <router-link to="/mypage"><el-button>back</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  recommendationMessage,
  longevityMessage,
  strengthMessage,
  genderMessage,
  frangranceMessage,
} from "../../config/config.js";
export default {
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      inputValues: {
        recommendation: null,
        longevity: null,
        strength: null,
        gender: null,
        content: null,
      },

      fragranceValue: [],

      perfumeName: null,
      searchKey: null,
      searchResult: [],
      perfumeId: null,
      isShow: false,
    };
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    checkInputData() {
      const inputData = {
        userPkId: localStorage.userid,
        perfumeId: this.perfumeId,
        recommendation: Number(this.inputValues.recommendation),
        longevity: Number(this.inputValues.longevity),
        strength: Number(this.inputValues.strength),
        gender: Number(this.inputValues.gender),
        fragrance: String(this.fragranceValue.map((el) => Number(el))),
        content: this.inputValues.content,
      };
      const isInit = Object.values(inputData).every((el) => el !== "");
      isInit ? this.handleSubmit(inputData) : alert("모든 값을 입력해주세요👀");
    },
    async handleSubmit(inputData) {
      try {
        const result = await this.$axios.post("/reviews", inputData);
        if (result.status == 200) {
          alert("등록이 완료되었습니다.");
          this.$router.push("/");
        }
      } catch (e) {
        console.log(e);
        alert("리뷰를 작성하지 못했어요😥");
      }
    },
    async searchPerfume() {
      if (this.searchKey == "") {
        this.isShow = false;
      } else {
        this.isShow = true;
        this.searchResult = [];
        try {
          const result = await this.$axios.get("/perfumes", {
            params: { searchKey: this.searchKey },
          });
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
    selectPerfume(perfume) {
      this.searchKey = perfume.perfume_name;
      this.searchResult = [];
      this.perfumeId = perfume.id;
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
form {
  width: 630px;
}
.searchBox {
  width: 300px;
  height: 150px;
  overflow: scroll;
  z-index: 1;
}
</style>