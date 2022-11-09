import axios from "axios";

const state = {
  reviewList: [],
};

const getters = {
  getReviewList(state) {
    return state.reviewList;
  },
};

const actions = {
  async fetchDataReviews({ commit }) {
    axios
      .get("/reviews")
      .then((res) => {
        commit("setReviewList", res.data);
      })
      .then((e) => {
        console.log(e);
      });
  },

  async addReview({ commit }, inputData) {
    console.log(inputData);
    axios
      .post("/reviews", inputData, {
        headers: {
          "Context-Type": "application/json",
        },
      }) //
      .then((res) => {
        console.log(res);
        commit;
      });
  },
};

const mutations = {
  setReviewList(state, payload) {
    state.reviewList = payload;
  },
};

export default { state, getters, mutations, actions };
