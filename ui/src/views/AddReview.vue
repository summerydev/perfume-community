<template>
  <div>
    <div>add review</div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="perfumeName">제품명</label>
        <input
          @input="submitAutoComplete"
          type="text"
          name="searchPerfumeName"
          v-model="searchPerfumeName"
          required
        />
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
      </div>
      <div>
        <label for="recommendation">어땠나요?</label>
        <input
          type="radio"
          name="recommendation"
          v-model="recommendationValues"
          value="별로에요"
        />
        <input
          type="radio"
          name="recommendation"
          v-model="recommendationValues"
          value="괜찮아요"
        />
        <input
          type="radio"
          name="recommendation"
          v-model="recommendationValues"
          value="좋아요"
        />
        <input
          type="radio"
          name="recommendation"
          v-model="recommendationValues"
          value="최고에요"
        />
        {{ recommendationValues }}
      </div>
      <div>
        <label for="longevity" required>오래 지속되나요?</label>
        <input
          type="radio"
          name="longevity"
          v-model="longevityValue"
          value="짧아요"
        />
        <input
          type="radio"
          name="longevity"
          v-model="longevityValue"
          value="괜찮아요"
        />
        <input
          type="radio"
          name="longevity"
          v-model="longevityValue"
          value="오래가요"
        />
        {{ longevityValue }}
      </div>
      <div>
        <label for="strength">향이 강하나요?</label>
        <input
          type="radio"
          name="strength"
          v-model="strengthValue"
          value="나만 맡을 수 있어요"
        />
        <input
          type="radio"
          name="strength"
          v-model="strengthValue"
          value="버스, 지하철 탈 수 있어요"
        />
        <input
          type="radio"
          name="strength"
          v-model="strengthValue"
          value="강력해요"
        />
        {{ strengthValue }}
      </div>
      <div>
        <label for="fragrance">어떤 향이 느껴지나요?</label>
        <input
          type="checkbox"
          name="fragrance"
          v-model="fragranceValue"
          value="green"
        />
        <input
          type="checkbox"
          name="fragrance"
          v-model="fragranceValue"
          value="b"
        />{{ fragranceValue }}
      </div>
      <div>
        <label for="content">리뷰를 작성해주세요.</label>
        <input type="text" v-model="content" />
      </div>
      <button>작성하기</button>
    </form>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchPerfumeName: null,
      perfumeName: null,
      recommendationValues: null,
      longevityValue: null,
      strengthValue: null,
      fragranceValue: [],
      content: null,
      searchResult: [],
      perfumeId: null,
      perfumeList: [],
      clickedPerfumeName: null,
    };
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

<style>
disabled {
  display: none;
}
</style>