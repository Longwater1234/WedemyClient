import { LoginRequest, User } from "@/types";
import http from "../axiosconfig";
import { AxiosRequestConfig } from "axios";

class AuthService {
  /** Login using BasicAuth in Springboot */
  loginUser({ email, password, responseToken }: LoginRequest) {
    const url = "/auth/login";

    const options: AxiosRequestConfig = {
      auth: {
        username: email,
        password: password,
      },
      params: {
        responseToken,
      },
    };

    return http.post(url, null, options);
  }

  /**  Login using FormLogin in Springboot  */
  loginUserForm(email: string, password: string, responseToken: string) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    params.append("responseToken", responseToken);

    const options: AxiosRequestConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      timeout: 5000,
    };

    return http.post("/login", params, options);
  }

  /** Register submits form to Server */
  registerUser(load: User) {
    let options = {
      params: {
        responseToken: load.responseToken,
      },
    };
    return http.post("/auth/register", load, options);
  }

  /** Obviously does what it says */
  logoutUser() {
    return http.post("/logout");
  }
}

export default new AuthService();
