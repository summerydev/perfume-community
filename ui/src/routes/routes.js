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
