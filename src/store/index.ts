import { computed, reactive } from "vue";
import http from "@/axiosconfig";

//FOR USER STATE
interface userState {
    id: number;
    username: string;
    loggedIn: boolean;
    cartCount: number;
}

const user: userState = reactive({
    id: 0,
    username: "",
    loggedIn: false,
    cartCount: 0
});

//GETTERS
const getters = reactive({
    isLoggedIn: computed(() => user.loggedIn),
    getCartCount: computed(() => user.cartCount)
});

const myActions = {

    async getAuthStatusServer() {
        try {
            const res = await http.get("/auth/statuslogin");
            user.loggedIn = res.data.loggedIn;
            user.username = res.data.user.fullname;
            user.id = res.data.user.id;
        } catch (error) {
            throw error;
        }
    },

    async getCartCountServer(): Promise<number> {
        if (!getters.isLoggedIn) return 0;
        try {
            const res = await http.get("/cart/mine/count");
            user.cartCount = res.data.count;
            return user.cartCount;
        } catch (error) {
            throw error;
        }
    }
};

export default {
    state: user,
    getters,
    ...myActions
};
