import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    meta: { hideFooter: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("@/views/Signup.vue")
  },
  {
    path: "/search",
    name: "SearchResults",
    component: () => import("@/views/SearchResults.vue")
  },
  {
    path: "/category/:name",
    name: "Category",
    component: () => import("@/views/Category.vue")
  },
  {
    path: "/course/:id(\\d+)",
    name: "Course",
    component: () => import("@/views/Course.vue")
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("@/views/Checkout.vue"),
    meta: { requireLogin: true, hideFooter: true }
  },
  {
    path: "/account/profile",
    name: "Profile",
    component: () => import("@/views/MyProfile.vue"),
    meta: { requireLogin: true, hideFooter: true }
  },
  {
    path: "/account/wishlist",
    name: "Wishlist",
    component: () => import("@/views/Wishlist.vue"),
    meta: { requireLogin: true, hideFooter: true }
  },
  {
    path: "/account/learning",
    name: "MyLearning",
    component: () => import("@/views/MyLearning.vue"),
    meta: { requireLogin: true, hideFooter: true }
  },
  {
    path: "/account/purchase-history",
    name: "PurchaseHistory",
    component: () => import("@/views/PurchaseHistory.vue"),
    meta: { requireLogin: true }
  },
  {
    path: "/account/learning/course/:courseId(\\d+)",
    name: "ResumeCourse",
    component: () => import("@/views/ResumeCourse.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }
  },
  {
    path: "/videoplayer/course/:courseId(\\d+)/lesson/:lessonId",
    name: "VideoPlayer",
    component: () => import("@/views/VideoPlayer.vue"),
    meta: { requireLogin: true }
  },
  {
    path: "/credits",
    name: "Credits",
    component: () => import("@/views/Credits.vue"),
    meta: {
      hideFooter: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/error500",
    name: "ServerError",
    component: () => import("@/views/Error500.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Error404.vue"),
    meta: {
      hideNavbar: true,
      hideFooter: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
