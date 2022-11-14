<template>
  <div>
    <h1>리뷰 등록하기</h1>
    <el-form label-width="150px">
      <el-form-item label="제품명" for="perfumeName">
        <el-row class="demo-autocomplete">
          <el-col :span="12">
            <el-autocomplete
              class="inline-input"
              v-model="searchKey"
              :fetch-suggestions="searchPerfume"
              placeholder="향수 이름 검색"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="어땠나요?" for="recommendationValue">
        <el-radio-group v-model="recommendationValue" size="small" required>
          <el-radio-button
            v-for="(item, index) in recommendationMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="오래 지속되나요?" for="longevityValue"
        ><el-radio-group v-model="longevityValue" size="small">
          <el-radio-button
            v-for="(item, index) in longevityMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="향이 얼마나 느껴지나요?" for="strengthValue"
        ><el-radio-group v-model="strengthValue" size="small">
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
      <el-form-item label="누구에게 추천하나요?" for="genderValue">
        <el-radio-group v-model="genderValue" size="small">
          <el-radio-button
            v-for="(item, index) in genderMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="리뷰를 작성해주세요." for="content"
        ><el-input type="textarea" :rows="2" v-model="content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">작성하기</el-button>
        <router-link to="/"><el-button>back</el-button></router-link>
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
} from "../config/config.js";
export default {
  data() {
    return {
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
      perfumeName: null,
      recommendationValue: null,
      longevityValue: null,
      strengthValue: null,
      genderValue: null,
      fragranceValue: [],
      content: null,
      searchKey: null,
      searchResult: [],
      perfumeId: null,
      perfumeList: [],
    };
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    async handleSubmit() {
      const inputData = {
        userPkId: localStorage.userid,
        perfumeId: this.searchResult[0].id,
        recommendation: Number(this.recommendationValue),
        longevity: Number(this.longevityValue),
        strength: Number(this.strengthValue),
        gender: Number(this.genderValue),
        fragrance: String(this.fragranceValue.map((el) => Number(el))),
        content: this.content,
      };
      try {
        const result = await this.$axios.post("/reviews", inputData);
        if (result.status == 200) {
          console.log(result);
          alert("등록이 완료되었습니다.");
          this.$router.push("/");
        }
      } catch (e) {
        console.log(e);
        alert("리뷰를 작성하지 못했어요😥");
      }
    },
    async searchPerfume(searchKey, cb) {
      try {
        const result = await this.$axios.get("/perfume", {
          params: { searchKey: searchKey },
        });
        this.searchResult = result.data;
        this.searchResult.map((e) => this.perfumeList.push(e.perfume_name));
        console.log(this.searchResult);
        // console.log(this.perfumeList);
        return cb(this.perfumeList);
      } catch (e) {
        console.log(e);
      }
    },
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style scoped>
form {
  width: 630px;
}
</style>