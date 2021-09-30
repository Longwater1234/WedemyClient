import store from "@/store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        beforeEnter: (to, from, next) => {
            if (store.getters.isLoggedIn) next({ name: "Home" })
            else next()
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/signup",
        name: "Signup",
        component: () => import("../views/Signup.vue")
    },
    {
        path: "/category",
        name: "Category",
        component: () => import("../views/Category.vue")
    },
    {
        path: "/course/:id",
        name: "Course",
        component: () => import("../views/Course.vue")
    },
    {
        path: "/cart",
        name: "Cart",
        component: () => import("../views/Cart.vue")
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
    history: createWebHashHistory(),
    routes
});

export default router;
