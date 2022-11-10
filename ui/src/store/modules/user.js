import axios from "axios";
import router from "../../routes/routes";

const state = {
  userInfo: null,
  isLogin: false,
  isLoginEror: false,
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
  async logout({ commit }) {
    commit("logout");
    alert("로그아웃 되었습니다.");
    localStorage.clear();
    router
      .push({
        path: "/",
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async updateUserInfo({ commit }, payload) {
    try {
      await axios.put(`/users/${payload}`).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
    commit("updateUserInfo");
  },
};

const mutations = {
  setRole(state, payload) {
    state.role = payload;
  },
  loginSuccess(state, payload) {
    state.isLogin = true;
    state.isLoginError = false;
    state.userInfo = payload;
  },
  loginToken(state, payload) {
    state.accessToken = payload.accessToken;
    state.refreshToken = payload.refreshToken;
    axios.defaults.headers.common["Authrization"] = `${payload.accessToken}`;
  },
  loginError(state) {
    state.isLogin = false;
    state.isLoginError = true;
    state.userInfo = null;
  },
  logout(state) {
    state.isLogin = false;
    state.isLoginError = false;
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
