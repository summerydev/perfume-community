<template>
  <div>
    <ul>
      <li v-for="brand in this.brandList" :key="brand.id">
        <div class="perfumeInfo">
          <div>{{ brand.name }}</div>
          <div class="date">
            최종수정일 : {{ brand.modified_date.substr(0, 10) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brandList: {},
    };
  },
  created() {
    this.getPerfumes();
  },
  methods: {
    async getPerfumes() {
      const res = await this.$axios.get("/brands");
      this.brandList = res.data;
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
.date {
  font-size: 0.8rem;
}
</style>