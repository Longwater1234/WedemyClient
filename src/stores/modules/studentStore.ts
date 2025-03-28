import { defineStore } from "pinia";
import { httpUtil } from "@/util/http_util";
import type { UserDto } from "@/interfaces/custom";

// FOR USER's state
interface UserState {
  id: number;
  fullname: string;
  loggedIn: boolean;
  cartCount: number;
}

const useStudentStore = defineStore({
  id: "studentStore",
  state: (): UserState => {
    return {
      id: 0,
      cartCount: 0,
      loggedIn: false,
      fullname: ""
    };
  },
  actions: {
    /**
     * Get from backend login status of currnet user
     *
     * @returns TRUE if logged in, else FALSE
     */
    async getLoginStatus(): Promise<boolean> {
      try {
        if (this.fullname !== "") {
          return true;
        }
        const res = await httpUtil.get("/auth/status");
        this.loggedIn = res.data.loggedIn;
        const user: UserDto = res.data?.userInfo;
        if (user) {
          this.id = user.id;
          this.fullname = user.fullname;
        }
        return this.loggedIn;
      } catch (error: any) {
        console.error(error.message);
        return false;
      }
    },
    /**
     * Get quantity of items in cart for this user
     *
     * @returns cart items count
     */
    async getCartCountServer(): Promise<number> {
      try {
        const res = await httpUtil.get("/cart/mine/count");
        this.cartCount = res.data.cartCount;
        return this.cartCount;
      } catch (error: any) {
        console.error(error.message);
        return 0;
      }
    },
    /**
     * Make a logout request to backend
     */
    async logoutUser() {
      await httpUtil.post("/auth/logout", {});
      this.$reset();
    }
  },
  getters: {
    getCartCount: (store): number => {
      return store.cartCount;
    },
    getIsLoggedIn: (store): boolean => {
      return store.loggedIn;
    }
  }
});

export default useStudentStore;
