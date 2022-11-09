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
  async signin({ commit }, inputData) {
    try {
      axios
        .put("/users/login", inputData) //
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            localStorage.setItem("accessToken", res.data.token.accessToken);
            localStorage.setItem("refreshToken", res.data.token.refreshToken);
            commit("loginToken", res.data.token);
            commit("loginSuccess", res.data.result);
            router
              .push({
                path: "/",
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
          commit("loginError");
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        });
    } catch (e) {
      console.log(e);
    }
  },
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
      axios.put(`/users/${payload}`).then((res) => {
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
