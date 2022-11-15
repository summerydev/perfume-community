<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="handleSubmit">
      <label for="userid">
        아이디
        <input
          v-model="userid"
          name="userid"
          type="text"
          placeholder="your id"
          @blur="checkDuplicate"
          required
        />
        <div v-if="!availableId">이미 사용중인 아이디입니다.</div>
      </label>
      <label for="password">
        비밀번호<input
          v-model="password"
          name="password"
          type="password"
          placeholder="your password"
          maxlength="25"
          required
        />
      </label>
      <label for="name">
        이름<input
          v-model="name"
          name="name"
          type="text"
          placeholder="your name"
          required
          maxlength="30"
        />
      </label>
      <label for="email">
        이메일<input
          v-model="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          maxlength="255"
        />
      </label>
      <label for="phone">
        전화번호<input
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="01030200807"
          required
          maxlength="12"
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
      userid: null,
      password: null,
      name: null,
      email: null,
      phone: null,
      availableId: true,
    };
  },
  methods: {
    async handleSubmit() {
      const intputdata = {
        userid: this.userid,
        password: this.password,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      try {
        const result = await this.$axios.post("/users", intputdata);
        if (result.status == 200) {
          alert("회원가입이 완료되었습니다.");
          this.$router.push("/signin");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async checkDuplicate() {
      if (this.userid) {
        const res = await this.$axios.get(`/users/${this.userid}`);
        console.log(res.data);
        if (res.data.result == "availableId") {
          this.availableId = true;
        } else if (res.data.result == "unavailableId") {
          this.availableId = false;
        }
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: auto;
}
</style>
