import http from '../axiosconfig';

interface User {
    email: string;
    fullname: string;
    password?: string;
    confirmPass?: string;
    datejoined?: string
}

class AuthService {
    loginUser(email: string, password: string) {
        const url = "/auth/statuslogin";

        const options = {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            withCredentials: true,
            auth: {
                username: email,
                password: password
            }
        };

        return http.post(url, null, options);
    }

    logoutUser() {
        return http.post("/logout")
    }


    registerUser({ email, fullname, password, confirmPass }: User) {
        return http.post("/auth/register", {
            fullname,
            email,
            password,
            confirmPass
        })
    }
}

export default new AuthService();
