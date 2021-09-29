import { reactive } from 'vue'

const state = reactive({
    username: "John",
    loggedIn: false
})

const myActions = () => {

    function setLogout() {
        state.loggedIn = false;
        state.username = ""
    }


    function setLogin (username: string) {
        state.loggedIn = true;
        state.username = username;
    }

    return {
        setLogin,
        setLogout
    }
}

export default {
    state,
    myActions
}


