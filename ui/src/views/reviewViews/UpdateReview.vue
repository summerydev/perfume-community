<template>
  <div>
    <el-form v-if="userInfo?.id == review.user_id" label-width="150px">
      <h1>리뷰 수정하기</h1>
      <el-form-item label="제품명" for="review">
        <el-row class="demo-autocomplete">
          <el-col :span="12">
            <el-input v-model="review.perfume_name" :disabled="true"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="어땠나요?" for="review.recommendation">
        <el-radio-group v-model="review.recommendation" size="small" required>
          <el-radio-button
            v-for="(item, index) in recommendationMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="오래 지속되나요?" for="review.longevity"
        ><el-radio-group v-model="review.longevity" size="small">
          <el-radio-button
            v-for="(item, index) in longevityMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="향이 얼마나 느껴지나요?" for="review.strength"
        ><el-radio-group v-model="review.strength" size="small">
          <el-radio-button
            v-for="(item, index) in strengthMessage"
            :key="index"
            :label="index"
            >{{ item }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="어떤 향이 느껴지나요?(최대 4개)"
        for="review.fragrance"
      >
        <el-checkbox-group v-model="review.fragrance" size="small" :max="4">
          <el-checkbox-button
            v-for="(item, index) in frangranceMessage"
            :key="index"
            :label="index"
            >{{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="누구에게 추천하나요?" for="review.gender">
        <el-radio-group v-model="review.gender" size="small">
          <el-radio-button
            v-for="(item, index) in genderMessage"
            :key="index"
            :label="index"
            >{{ item }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="리뷰를 작성해주세요." for="review.content"
        ><el-input type="textarea" :rows="2" v-model="review.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkInputData">수정하기</el-button>
        <el-button type="danger" @click="handleDelete">삭제하기</el-button>
        <el-button @click="$router.go('-1')">back</el-button>
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
      review: {
        user_id: null,
        user_name: null,
        perfume_id: null,
        perfume_name: null,
        recommendation: null,
        longevity: null,
        strength: null,
        fragrance: [],
        gender: null,
        content: null,
      },
      reviewPkId: this.$route.params.id,
    };
  },
  created() {
    this.getOneReview();
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    async getOneReview() {
      try {
        const res = await this.$axios.get(`/reviews/${this.reviewPkId}`);
        this.review = res.data;
        this.review.fragrance = res.data.fragrance.split(",");
      } catch (e) {
        console.log(e);
      }
    },
    checkInputData() {
      const inputData = {
        recommendation: Number(this.review.recommendation),
        longevity: Number(this.review.longevity),
        strength: Number(this.review.strength),
        gender: Number(this.review.gender),
        fragrance: String(this.review.fragrance.map((el) => Number(el))),
        content: this.review.content,
      };
      const isInit = Object.values(inputData).every(
        (el) => el !== "" && el != null
      );
      isInit ? this.handleSubmit(inputData) : alert("모든 값을 입력해주세요👀");
    },
    async handleSubmit(inputData) {
      try {
        const res = await this.$axios.put(
          `/reviews/${this.reviewPkId}`,
          inputData
        );
        if (res.data.ok) {
          alert("수정이 완료되었습니다.");
          this.$router.push("/");
        } else if (!res.data.ok) {
          alert("🤔 존재하지 않는 리뷰입니다.");
        }
      } catch (e) {
        console.log(e);
        alert("리뷰를 수정하지 못했어요😥");
      }
    },
    async handleDelete() {
      const deleteConfirm = confirm("삭제하시겠습니까?");
      if (deleteConfirm) {
        try {
          const res = await this.$axios.delete(`/reviews/${this.reviewPkId}`);
          if (res.data.ok) {
            alert("삭제가 완료되었습니다.");
            this.$router.push("/");
          } else if (!res.data.ok) {
            alert("🤔 삭제할 수 없습니다.");
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
form {
  width: 630px;
  margin: auto;
}
form .el-row {
  display: flex;
  text-align: right;
  align-items: center;
  padding: 10px;
}
</style>