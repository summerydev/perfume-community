<template>
  <div>
    <ul>
      <li v-for="perfume in this.perfumeList" :key="perfume.id">
        <div>
          <el-link
            type="primary"
            @click="updateConfirm(perfume.id, perfume.perfume_name)"
            class="updatebtn"
          >
            수정
          </el-link>
        </div>
        <div class="box">
          <div class="img-box">
            <img v-bind:src="perfume.path" alt="perfume image" class="image" />
          </div>
          <div class="perfumeInfo">
            <h3>{{ perfume.perfume_name }}</h3>
            <div>{{ perfume.name }}</div>
            <div class="date">
              최종수정일 : {{ perfume.modified_date.substr(0, 10) }}
            </div>
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
    updateConfirm(perfumeId, perfume_name) {
      const flag = confirm(`${perfume_name} 수정하시겠습니까?`);
      flag ? this.$router.push(`/admin/perfumes/${perfumeId}`) : "";
    },
  },
};
</script>

<style scoped>
ul {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  background-color: white;
}
.box {
  display: flex;
  margin: 5px;
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
.updatebtn {
  float: right;
}
</style>