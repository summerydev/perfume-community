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
    try {
      const result = await axios.get("/reviews");
      commit("setReviewList", result.data);
    } catch (e) {
      console.log(e);
    }
  },

};

const mutations = {
  setReviewList(state, payload) {
    state.reviewList = payload;
  },
};

export default { state, getters, mutations, actions };
