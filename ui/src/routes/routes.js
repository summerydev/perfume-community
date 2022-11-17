import Vue from "vue";
import VueRouter from "vue-router";
import AllReviews from "../views/reviewViews/AllReviews.vue";
import MyPage from "../views/userViews/MyPage.vue";
import AddReview from "../views/reviewViews/AddReview.vue";
import SignIn from "../views/userViews/SignIn.vue";
import SignUp from "../views/userViews/SignUp.vue";
import UpdateUser from "../views/userViews/UpdateUser.vue";
import UpdateReview from "../views/reviewViews//UpdateReview.vue";
import ErrorPage from "../views/ErrorPage.vue";
import PerfumeReview from "../views/reviewViews/PerfumeReview.vue";
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
      meta: { requiresAuth: true },
    },
    {
      path: "/mypage",
      component: MyPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/mypage/update",
      component: UpdateUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/addreview",
      component: AddReview,
      meta: { requiresAuth: true },
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
      path: "/perfumes",
      component: PerfumeReview,
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
    alert("로그인이 필요한 서비스입니다.");
    next("/signin");
  } else {
    next();
  }
});

export default router;
