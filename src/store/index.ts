import { computed, reactive } from "vue";
import http from "@/axiosconfig";

//FOR USER's state
interface userState {
    username: string;
    loggedIn: boolean;
    cartCount: number;
}

const user: userState = reactive({
    username: "",
    loggedIn: false,
    cartCount: 0,
});

//GETTERS
const getters = reactive({
    isLoggedIn: computed(() => user.loggedIn),
    getCartCount: computed(() => user.cartCount),
});

const myActions = {
    async getAuthStatusServer(): Promise<Boolean> {
        try {
            const res = await http.get("/auth/statuslogin");
            user.loggedIn = res.data.loggedIn;
            user.username = res.data.user.fullname || res.data.user;
            return Boolean(user.loggedIn);
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    },

    async getCartCountServer(): Promise<number> {
        if (!getters.isLoggedIn) return 0;
        try {
            const res = await http.get("/cart/mine/count");
            user.cartCount = res.data.cartCount;
            return user.cartCount;
        } catch (error: any) {
            console.error(error.message);
            return 0;
        }
    },
};

export default {
    state: user,
    getters,
    ...myActions,
};
