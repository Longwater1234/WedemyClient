import {computed, reactive} from "vue";
import http from "@/axiosconfig";
import {AxiosError} from "axios";

// FOR USER's state
interface userState {
    username: string;
    loggedIn: boolean;
    cartCount: number;
}

const User: userState = reactive({
    username: "",
    loggedIn: false,
    cartCount: 0,
});

//GETTERS
const getters = reactive({
    isLoggedIn: computed(() => User.loggedIn),
    getCartCount: computed(() => User.cartCount),
});

const myActions = {
    async getAuthStatusServer(): Promise<boolean> {
        try {
            const res = await http.get("/auth/statuslogin");
            User.loggedIn = res.data.loggedIn;
            User.username = res.data.user?.fullname || res.data.user;
            return Boolean(User.loggedIn);
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    },

    async getCartCountServer(): Promise<number> {
        try {
            const res = await http.get("/cart/mine/count");
            User.cartCount = res.data.cartCount;
            return User.cartCount;
        } catch (error: any) {
            console.error(error.message);
            return 0;
        }
    },
};

export default {
    state: User,
    getters,
    ...myActions,
};
