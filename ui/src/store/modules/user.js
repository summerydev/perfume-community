import axios from "axios";

const state = {
  userInfo: null,
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  role: null,
  myReviews: null,
};

const getters = {
  getIsLogin(state) {
    return state.isLogin;
  },
  getToken(state) {
    return state.accessToken;
  },
  getUserInfo(state) {
    return state.userInfo;
  },
  getmyReviews(state) {
    return state.myReviews;
  },
};

const actions = {
  async fetchMyReviews({ commit }, payload) {
    try {
      const result = await axios.get(`/users/${payload}`);
      commit("setMyReviews", result.data);
    } catch (e) {
      console.log(e);
    }
  },
};

const mutations = {
  setRole(state, payload) {
    state.role = payload;
  },
  loginSuccess(state, payload) {
    state.isLogin = true;
    state.userInfo = payload;
  },
  loginToken(state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    axios.defaults.headers.common["Authrization"] = `${payload.accessToken}`;
  },
  logout(state) {
    state.isLogin = false;
    state.userInfo = null;
    state.accessToken = null;
    state.refreshToken = null;
  },
  updateUserInfo(state, payload) {
    state.userInfo = payload;
    state.userList = payload;
  },
  setMyReviews(state, payload) {
    state.myReviews = payload;
  },
};

export default { state, getters, mutations, actions };
