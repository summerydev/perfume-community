import axios from "axios";

const state = {
  userInfo: null,
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  role: null,
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
};

const actions = {
  async loginCheck({ commit }) {
    if (localStorage.accessToken) {
      const data = await axios.get("/", localStorage.accessToken);
      if (data.status == 200) {
        const result = await axios.put(`/users/login/${localStorage.userid}`);
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        commit("loginToken", { accessToken, refreshToken });
        commit("loginSuccess", result.data.user);
      }
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
};

export default { state, getters, mutations, actions };
