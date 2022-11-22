<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>회원 정보 수정</h1>
      <label for="id">
        <el-row v-if="userInfo">
          <el-col :span="6">아이디</el-col>
          <el-col :span="18">
            <el-input v-model="userInfo.user_id" required :disabled="true" />
          </el-col>
        </el-row>
      </label>
      <label for="password">
        <el-row>
          <el-col :span="6">비밀번호</el-col>
          <el-col :span="18">
            <el-input
              v-model="userData.password"
              type="password"
              placeholder="your password"
              required
            />
          </el-col>
        </el-row>
      </label>
      <label for="name">
        <el-row>
          <el-col :span="6">이름</el-col>
          <el-col :span="18">
            <el-input
              v-model="userData.name"
              type="text"
              placeholder="your name"
              required
            />
          </el-col>
        </el-row>
      </label>
      <label for="email">
        <el-row>
          <el-col :span="6">이메일</el-col>
          <el-col :span="18">
            <el-input
              v-model="userData.email"
              type="email"
              placeholder="your email"
              required
              minlength="7"
              maxlength="255"
              @blur="checkEmail"
            />
            <span v-if="!rule.email.available" class="msg-val">
              {{ rule.email.message }}
            </span>
          </el-col>
        </el-row>
      </label>
      <label for="phone">
        <el-row>
          <el-col :span="6">전화번호</el-col>
          <el-col :span="18">
            <el-input
              v-model="phone"
              type="tel"
              placeholder="01030200807"
              required
              minlength="13"
              maxlength="13"
              @input="autoHyphen(phone)"
            />
          </el-col>
        </el-row>
      </label>
      <el-row>
        <el-col :span="6" :offset="6"></el-col>
        <el-col><button class="submitBtn" type="submit">저장</button></el-col>
        <el-col>
          <el-button @click="$router.go('-1')">back</el-button>
        </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userid: this.userInfo?.user_id,
      userPkId: localStorage.userid,
      userData: {
        password: null,
        name: null,
        email: null,
        phone: null,
      },
      phone: null,
      rule: {
        email: {
          available: false,
          message: null,
        },
      },
    };
  },
  computed: {
    ...mapGetters({ isLogin: "getIsLogin", userInfo: "getUserInfo" }),
  },
  methods: {
    async handleSubmit() {
      const rule = this.rule;
      if (rule.email.available) {
        try {
          const result = await this.$axios.put(
            `/users/${this.userPkId}`,
            this.userData
          );
          if (result.data.ok) {
            alert("회원정보 수정이 완료되었습니다.");
            this.$router.push("/mypage");
          } else if (!result.data.ok) {
            alert("존재하지 않는 사용자입니다.");
          }
        } catch (e) {
          alert("수정에 실패했습니다.😭");
          console.log(e);
        }
        this.$store.commit("updateUserInfo");
      } else if (!rule.email.available) {
        alert("유효한 이메일을 입력해주세요👀");
      }
    },
    autoHyphen(phone) {
      this.phone = phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      this.userData.phone = this.phone.replace(/[^0-9]/g, "");
    },
    checkEmail() {
      const email = this.rule.email;
      const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const validation = emailRegex.test(this.userData.email);
      if (validation) {
        email.available = true;
      } else {
        email.available = false;
        email.message = "유효한 이메일을 입력해주세요.";
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

form > label {
  height: 60px;
  margin: 5px;
}

form .el-row {
  display: flex;
  text-align: right;
  align-items: center;
}

.el-row .el-col-6 {
  padding: 5px;
}
</style>