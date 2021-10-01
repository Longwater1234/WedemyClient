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
    setLogout() {
        user.loggedIn = false;
        user.username = "";
    },

    updateAuthStatus(fullname: string, userId: number) {
        user.loggedIn = true;
        user.username = fullname;
        user.id = userId
    },

    async isAuthenticated() {
        try {
            let res = await http.post("/auth/statuslogin", null);
            user.loggedIn = res.data.success;
            user.username = res.data.user.fullname;
        } catch (error) {
            throw error;
        }
    },

    async getCartCount(): Promise<number> {
        if (!getters.isLoggedIn) return 0;
        try {
            let res = await http.get("/cart/count");
            user.cartCount = res.data.count
            return user.cartCount;
        } catch (error) {
           console.error(error);
           return 0;
        }
    }
};

export default {
    state: user,
    getters,
    ...myActions
};
