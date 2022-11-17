<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>회원가입</h1>
      <label for="userid">
        아이디
        <el-input
          v-model="inputData.userid"
          name="userid"
          type="text"
          placeholder="your id"
          required
        />
        <span>
          <el-link type="danger" @click="checkId">아이디 체크</el-link>
          <span v-if="isChecked">
            {{ checkIdMessge }}
          </span>
        </span>
      </label>
      <label for="password">
        비밀번호<el-input
          v-model="inputData.password"
          name="password"
          type="password"
          placeholder="your password"
          maxlength="25"
          required
        />
      </label>
      <label for="name">
        이름<el-input
          v-model="inputData.name"
          name="name"
          type="text"
          placeholder="your name"
          required
          maxlength="30"
        />
      </label>
      <label for="email">
        이메일<el-input
          v-model="inputData.email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          maxlength="255"
        />
      </label>
      <label for="phone">
        전화번호<el-input
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="01030200807"
          required
          maxlength="13"
          @input="autoHyphen(phone)"
        />
      </label>
      <button type="submit">회원가입하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: {
        userid: null,
        password: null,
        name: null,
        email: null,
        phone: null,
      },
      phone: null,
      isChecked: false,
      availableId: true,
      checkIdMessge: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (this.isChecked && this.availableId) {
        try {
          const result = await this.$axios.post("/users", this.inputData);
          if (result.status == 200) {
            alert("회원가입이 완료되었습니다.");
            this.$router.push("/signin");
          }
        } catch (e) {
          console.log(e);
        }
      } else if (!this.isChecked) {
        alert("아이디 중복 체크를 해주세요!👀");
      } else if (!this.availableId) {
        alert("사용 가능한 아이디를 입력해주세요👀");
      }
    },
    async checkId() {
      this.isChecked = true;
      const userIdRegex = /^[A-Za-z0-9+]{3,}$/;
      const validation = userIdRegex.test(this.inputData.userid);
      if (!validation) {
        this.checkIdMessge = "영어 3글자 이상 입력해주세요.";
      } else {
        const res = await this.$axios.get(`/users/${this.inputData.userid}`);
        console.log(res.data);
        if (res.data.ok) {
          this.availableId = true;
          this.checkIdMessge = "사용 가능한 아이디입니다.";
        } else if (!res.data.ok) {
          this.availableId = false;
          this.checkIdMessge = "이미 사용중인 아이디입니다.";
        }
      }
    },
    autoHyphen(phone) {
      this.phone = phone
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      this.inputData.phone = this.phone.replace(/[^0-9]/g, "");
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
</style>
