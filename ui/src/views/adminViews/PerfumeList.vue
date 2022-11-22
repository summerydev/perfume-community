<template>
  <div>
    <ul>
      <li v-for="perfume in this.perfumeList" :key="perfume.id">
        <div class="img-box">
          <img v-bind:src="perfume.path" alt="perfume image" class="image" />
        </div>
        <div class="perfumeInfo">
          <div>{{ perfume.perfume_name }}</div>
          <div>{{ perfume.name }}</div>
          <div>최종수정일 : {{ perfume.modified_date.substr(0, 10) }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perfumeList: {},
    };
  },
  created() {
    this.getPerfumes();
  },
  methods: {
    async getPerfumes() {
      const res = await this.$axios.get("/perfumes");
      this.perfumeList = res.data;
    },
  },
};
</script>

<style scoped>
ul {
  margin: auto;
}
li {
  display: flex;
  list-style: none;
  margin: 5px;
  padding: 5px;
  background-color: white;
}
.perfumeInfo {
  text-align: left;
  padding: 10px;
  font-size: 1.1rem;
}
.perfumeInfo > * {
  margin: 5px;
}
.img-box {
  width: 60px;
  height: 120px;
  margin-right: 10px;
}
.image {
  height: 100px;
  width: 100%;
  object-fit: cover;
}
</style>