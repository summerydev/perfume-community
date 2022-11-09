import Vue from "vue";
import VueRouter from "vue-router";
import Reviews from "../views/Reviews.vue";
import MyPage from "../views/MyPage.vue";
import AddReview from "../views/AddReview.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UpdateUser from "../views/UpdateUser.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/reviews",
    },
    {
      path: "/reviews",
      component: Reviews,
    },
    {
      path: "/mypage",
      component: MyPage,
    },
    {
      path: "/mypage/update",
      component: UpdateUser,
    },
    {
      path: "/addreview",
      component: AddReview,
    },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/signup",
      component: SignUp,
    },
  ],
});

export default router;
