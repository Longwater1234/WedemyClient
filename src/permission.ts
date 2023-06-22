import router from "./router";
import { useStudentStore } from "@/stores";

// 对于这些，不要检查登录
const WHITE_LIST: string[] = ["/404", "/500", "/", "/login", "/signup"];

router.beforeEach(async (to, from, next) => {
  const studentStore = useStudentStore();
  if (WHITE_LIST.find(item => item.toLowerCase() === to.path.toLowerCase())) {
    return next();
  }

  if (to.path === "/login" || to.path === "/signup") {
    const isLoggedIn = await studentStore.getLoginStatus();
    if (isLoggedIn) return next("/");
    return next();
  }
  if (to.meta && !to.meta.requireLogin) {
    return next();
  }
  try {
    const loggedIn = await studentStore.getLoginStatus();
    loggedIn ? next() : next("/login");
  } catch (e) {
    studentStore.$reset();
    next("/login");
  }
});
