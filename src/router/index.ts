import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: async (to, from, next) => {
      let isLoggedIn = await store.getAuthStatusServer();
      if (isLoggedIn) next({ name: "Home" });
      else next();
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/Signup.vue")
  },
  {
    path: "/search",
    name: "SearchResults",
    component: () => import("../views/SearchResults.vue")
  },
  {
    path: "/category/:name",
    name: "Category",
    component: () => import("../views/Category.vue")
  },
  {
    path: "/course/:id(\\d+)",
    name: "Course",
    component: () => import("../views/Course.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound404.vue"),
    meta: {
      hideNavbar: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
