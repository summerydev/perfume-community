<template>
  <div>
    <h1>리뷰 등록하기</h1>
    <el-form @submit.prevent="handleSubmit" label-width="150px">
      <el-form-item label="제품명" for="perfumeName">
        <el-input
          @input="submitAutoComplete"
          type="text"
          name="searchPerfumeName"
          v-model="searchPerfumeName"
          required
        />
      </el-form-item>
      <el-form-item label="어땠나요?" for="recommendationValue">
        <el-radio-group v-model="recommendationValue" size="small" required>
          <el-radio-button
            v-for="(item, index) in recommendationMessage"
            :key="index"
            :label="item"
            name="recommendation"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="오래 지속되나요?" for="longevityValue"
        ><el-radio-group v-model="longevityValue" size="small">
          <el-radio-button
            v-for="(item, index) in longevityMessage"
            :key="index"
            :label="item"
            name="longevity"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="향이 얼마나 느껴지나요?" for="strengthValue"
        ><el-radio-group v-model="strengthValue" size="small">
          <el-radio-button
            v-for="(item, index) in strengthMessage"
            :key="index"
            :label="item"
            name="strength"
          >
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="어떤 향이 느껴지나요?" for="fragranceValue">
        <el-checkbox-group v-model="fragranceValue" size="small">
          <el-checkbox-button
            v-for="(item, index) in frangranceMessage"
            :key="index"
            :label="item"
            name="fragrance"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="리뷰를 작성해주세요." for="content"
        ><el-input type="textarea" :rows="2" v-model="content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">작성하기</el-button>
        <router-link to="/"><el-button>back</el-button></router-link>
      </el-form-item>

      <!-- <div>
        <div class="autocomplete disabled">
          <div
            @click="setPerfumeName"
            style="cursor: pointer"
            v-for="(res, i) in perfumeList"
            :key="i"
          >
            {{ res }}
          </div>
        </div>
      </div> -->
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
      searchPerfumeName: null,
      perfumeName: null,
      recommendationValue: null,
      longevityValue: null,
      strengthValue: null,
      fragranceValue: [],
      content: null,
      searchResult: [],
      perfumeId: null,
      perfumeList: [],
      clickedPerfumeName: null,
      recommendationMessage,
      longevityMessage,
      strengthMessage,
      genderMessage,
      frangranceMessage,
    };
  },
  created() {
    console.log(recommendationMessage[0]);
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    submitAutoComplete() {
      const autocomplete = document.querySelector(".autocomplete");
      if (this.searchPerfumeName) {
        autocomplete.classList.remove("disabled");
        this.handleGetPerfume();
      } else {
        autocomplete.classList.add("disabled");
      }
    },
    async handleSubmit() {
      const inputData = {
        userPkId: this.userInfo[0].id,
        perfumeName: this.perfumeName,
        recommendationValues: this.recommendationValues,
        longevityValue: this.longevityValue,
        strengthValue: this.strengthValue,
        fragranceValue: this.fragranceValue,
        content: this.content,
      };
      try {
        await this.$axios.post("/reviews", inputData);
      } catch (e) {
        console.log(e);
      }
    },
    async handleGetPerfume() {
      try {
        const result = await this.$axios.get("/perfume", {
          params: { perfumeName: this.searchPerfumeName },
        });
        this.searchResult = result.data;
        this.searchResult.map((e) => this.perfumeList.push(e.perfume_name));
        console.log(this.perfumeList);
        console.log(this.perfumeName);
      } catch (e) {
        console.log(e);
      }
    },
    setPerfumeName() {
      // this.perfumeName = this.clickedPerfumeName;
    },
  },
};
</script>

<style scoped>
disabled {
  display: none;
}
form {
  width: 630px;
}
</style>