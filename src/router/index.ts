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
    beforeEnter: (to, from, next) => {
      let isLoggedIn = store.getters.isLoggedIn;
      if (isLoggedIn) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/Signup.vue"),
    beforeEnter: (to, from, next) => {
      let isLoggedIn = store.getters.isLoggedIn;
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
      let itemCount = store.state.cartCount;
      if (itemCount === 0) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/account/wishlist",
    name: "Wishlist",
    component: () => import("../views/Wishlist.vue"),
    beforeEnter: (to, from, next) => {
      let isLoggedIn = store.getters.isLoggedIn;
      if (!isLoggedIn) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/account/purchase-history",
    name: "PurchaseHistory",
    component: () => import("../views/PurchaseHistory.vue"),
    beforeEnter: async (to, from, next) => {
      let isLoggedIn = await store.getAuthStatusServer();
      if (!isLoggedIn) next({ name: "Login" });
      else next();
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
