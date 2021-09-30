import { computed, reactive } from "vue";
import http from "@/axiosconfig";

type authState = {
    username: string;
    loggedIn: boolean;
};

const state: authState = reactive({
    username: "",
    loggedIn: false
});

const getters = reactive({
    isLoggedIn: computed(() => state.loggedIn)
});

const myActions = {
    setLogout() {
        state.loggedIn = false;
        state.username = "";
    },

    setAuthStatus(fullname: string) {
        state.loggedIn = true;
        state.username = fullname;
    },

    async getAuthStatusServer() {
        try {
            let res = await http.post("/auth/statuslogin", null);
            state.loggedIn = res.data.success;
            state.username = res.data.user.fullname;
            return true;
        } catch (error) {
            console.error("AUTH_ERROR", error);
            return false;
        }
    }
};

export default {
    state,
    getters,
    ...myActions
};
