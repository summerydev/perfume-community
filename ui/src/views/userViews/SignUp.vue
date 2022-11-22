<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>회원가입</h1>
      <label for="userid" style="position: relative">
        아이디
        <el-input
          v-model="inputData.userid"
          name="userid"
          type="text"
          placeholder="your id"
          required
        />
        <span>
          <span class="msg-val">
            {{ rule.id.message }}
            <el-link type="danger" @click="checkId">아이디 체크</el-link>
            <span v-if="rule.id.available"> ✅</span>
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
      <label for="email" style="position: relative">
        이메일
        <el-input
          v-model="inputData.email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          minlength="7"
          maxlength="255"
          @blur="checkEmail"
        />
        <span v-if="!rule.email.available" class="msg-val">
          {{ rule.email.message }}
        </span>
      </label>
      <label for="phone">
        전화번호<el-input
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="01030200807"
          required
          minlength="13"
          maxlength="13"
          @input="autoHyphen(phone)"
        />
      </label>
      <button class="submitBtn" type="submit">회원가입하기</button>
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
      rule: {
        id: {
          isChecked: false,
          available: false,
          message: null,
        },
        email: {
          available: false,
          message: null,
        },
      },
    };
  },
  methods: {
    async handleSubmit() {
      const rule = this.rule;
      if (rule.id.isChecked && rule.id.available && rule.email.available) {
        try {
          const result = await this.$axios.post("/users", this.inputData);
          if (result.data.ok) {
            alert("회원가입이 완료되었습니다.");
            this.$router.push("/signin");
          }
        } catch (e) {
          console.log(e);
        }
      } else if (!rule.id.isChecked) {
        alert("아이디 중복 체크를 해주세요!👀");
      } else if (!rule.id.available) {
        alert("사용 가능한 아이디를 입력해주세요👀");
      } else if (!rule.email.available) {
        alert("유효한 이메일을 입력해주세요👀");
      }
    },
    async checkId() {
      console.log(this.inputData.userid);
      const id = this.rule.id;
      id.isChecked = true;
      const userIdRegex = /^[A-Za-z0-9+]{3,}$/;
      const validation = userIdRegex.test(this.inputData.userid);
      if (!validation) {
        id.available = false;
        id.message = "영어 3글자 이상 입력해주세요.";
        id.isChecked = false;
      } else {
        try {
          const res = await this.$axios.get(`/users/${this.inputData.userid}`);
          if (res.data.ok) {
            id.available = true;
            id.message = "사용 가능한 아이디입니다.";
          } else if (!res.data.ok) {
            id.available = false;
            id.message = "이미 사용중인 아이디입니다.";
            id.isChecked = false;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    checkEmail() {
      const email = this.rule.email;
      const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const validation = emailRegex.test(this.inputData.email);
      if (validation) {
        email.available = true;
      } else {
        email.available = false;
        email.message = "유효한 이메일을 입력해주세요.";
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

form > label {
  height: 85px;
  margin: 5px;
}
</style>
