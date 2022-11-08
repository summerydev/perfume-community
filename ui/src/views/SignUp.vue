<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="handleSubmit">
      <label for="userid">
        <input
          v-model="userid"
          name="userid"
          type="text"
          placeholder="your id"
          required
        />
      </label>
      <label for="password"
        ><input
          v-model="password"
          name="password"
          type="password"
          placeholder="your password"
          required
      /></label>
      <label for="name"
        ><input
          v-model="name"
          name="name"
          type="text"
          placeholder="your name"
          required
      /></label>
      <label for="email"
        ><input
          v-model="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
      /></label>
      <label for="phone"
        ><input
          v-model="phone"
          name="phone"
          type="tel"
          placeholder="01030200807"
          required
      /></label>
      <button>회원가입하기</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      const intputdata = {
        userid: this.userid,
        password: this.password,
        name: this.name,
        email: this.email,
        phone: this.phone,
      };
      this.$axios.post("/users", intputdata);
      console.log(intputdata);
    },
  },
};
</script>

<style>
</style>