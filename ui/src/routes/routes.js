import Vue from "vue";
import VueRouter from "vue-router";

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
      redirect: "/reviews/list",
      component: () => import("../views/reviewViews/ReviewMain.vue"),
      children: [
        {
          path: "list",
          name: "reviewlist",
          component: () => import("../views/reviewViews/AllReviews.vue"),
        },
        {
          path: "perfumes",
          name: "perfumes",
          component: () => import("../views/reviewViews/PerfumeReview.vue"),
        },
      ],
    },

    {
      path: "/reviews/:id",
      component: () => import("../views/reviewViews/UpdateReview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/mypage",
      component: () => import("../views/userViews/MyPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/mypage/update",
      component: () => import("../views/userViews/UpdateUser.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/addreview",
      component: () => import("../views/reviewViews/AddReview.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/signin",
      component: () => import("../views/userViews/SignIn.vue"),
    },
    {
      path: "/signup",
      component: () => import("../views/userViews/SignUp.vue"),
    },

    {
      path: "/admin",
      redirect: "/admin/perfumes",
      component: () => import("../views/adminViews/AdminMain.vue"),
      children: [
        {
          path: "perfumes",
          name: "perfumeslist",
          component: () => import("../views/adminViews/PerfumeList.vue"),
        },
        {
          path: "brands",
          name: "brandslist",
          component: () => import("../views/adminViews/BrandList.vue"),
        },
        {
          path: "addperfume",
          name: "addperfume",
          component: () => import("../views/adminViews/AddPerfume.vue"),
        },
        {
          path: "addbrand",
          name: "addbrand",
          component: () => import("../views/adminViews/AddBrand.vue"),
        },
        {
          path: "perfumes/:id",
          name: "updateperfumes",
          component: () => import("../views/adminViews/UpdatePerfume.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "ErrorPage",
      component: () => import("../views/ErrorPage.vue"),
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
