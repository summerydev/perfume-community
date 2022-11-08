<template>
  <div>
    <div>add review</div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="perfumeName">제품명</label>
        <input type="text" name="perfumeName" v-model="perfumeName" required />
      </div>
      <div>
        <label for="brand">브랜드</label>
        <input type="text" name="brand" v-model="brand" required />
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
          value="a"
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
export default {
  data() {
    return {
      perfumeName: "",
      brand: "",
      recommendationValues: "",
      longevityValue: "",
      strengthValue: "",
      fragranceValue: [],
      content: "",
    };
  },
  methods: {
    handleSubmit() {
      const inputData = {
        perfumeName: this.perfumeName,
        brand: this.brand,
        recommendationValues: this.recommendationValues,
        longevityValue: this.longevityValue,
        strengthValue: this.strengthValue,
        fragranceValue: this.fragranceValue,
        content: this.content,
      };

      this.$store.dispatch("addReview", inputData);
    },
  },
};
</script>

<style>
</style>