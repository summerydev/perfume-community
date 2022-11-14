import Vue from "vue";
import VueRouter from "vue-router";
import AllReviews from "../views/AllReviews.vue";
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
      redirect: "/allreviews",
    },
    {
      path: "/allreviews",
      component: AllReviews,
    },
    {
      path: "/mypage",
      component: MyPage,
      meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("accessToken");
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLogin) {
    next("/");
  } else {
    next();
  }
});

export default router;
