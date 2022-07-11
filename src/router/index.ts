import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (isLoggedIn) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/Signup.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (isLoggedIn) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/search",
    name: "SearchResults",
    component: () => import("../views/SearchResults.vue"),
  },
  {
    path: "/category/:name",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/course/:id(\\d+)",
    name: "Course",
    component: () => import("../views/Course.vue"),
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
    beforeEnter: (to, from, next) => {
      const itemCount = store.state.cartCount;
      if (!itemCount) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/account/profile",
    name: "Profile",
    component: () => import("../views/MyProfile.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/account/wishlist",
    name: "Wishlist",
    component: () => import("../views/Wishlist.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/account/learning",
    name: "MyLearning",
    component: () => import("../views/MyLearning.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/account/purchase-history",
    name: "PurchaseHistory",
    component: () => import("../views/PurchaseHistory.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/account/learning/course/:courseId(\\d+)",
    name: "ResumeCourse",
    component: () => import("../views/ResumeCourse.vue"),
    meta: {
      hideNavbar: true,
    },
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/videoplayer/course/:courseId(\\d+)/lesson/:lessonId",
    name: "VideoPlayer",
    component: () => import("../views/VideoPlayer.vue"),
    beforeEnter: async (to, from, next) => {
      const isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/credits",
    name: "Credits",
    component: () => import("../views/Credits.vue"),
  },
   {
    path: "/Error500",
    name: "ServerError",
    component: () => import("../views/Error500.vue"),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/Error404.vue"),
    meta: {
      hideNavbar: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
