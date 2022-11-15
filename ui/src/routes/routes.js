import Vue from "vue";
import VueRouter from "vue-router";
import AllReviews from "../views/AllReviews.vue";
import MyPage from "../views/MyPage.vue";
import AddReview from "../views/AddReview.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import UpdateUser from "../views/UpdateUser.vue";
import UpdateReview from "../views/UpdateReview.vue";
import ErrorPage from "../views/ErrorPage.vue"
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
      path: "/reviews/:id",
      component: UpdateReview,
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
    {
      path: "/:catchAll(.*)",
      name: "ErrorPage",
      component: ErrorPage,
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
