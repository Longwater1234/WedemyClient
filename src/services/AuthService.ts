import { User } from "@/types";
import axios from "axios";
import http from "../axiosconfig";

class AuthService {
  /** Uses BasicAuth of Springboot */
  loginUser(email: string, password: string) {
    const url = "/auth/login";

    const options = {
      auth: {
        username: email,
        password: password
      }
    };

    return http.post(url, null, options);
  }

  /** Obviously does what it says */
  logoutUser() {
    return http.post("/logout");
  }

  /**  Uses FormLogin of Springboot  */
  loginUserForm(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const options = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
      }
    };

    return axios.post(process.env.VUE_APP_SERVER_ROOT_URL + "login", params, options);
  }

  /** sends the whole package to Server */
  registerUser({ email, fullname, password, confirmPass }: User) {
    return http.post("/auth/register", {
      fullname,
      email,
      password,
      confirmPass
    });
  }
}

export default new AuthService();
