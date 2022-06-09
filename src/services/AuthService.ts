import { User } from "@/types";
import http from "../axiosconfig";

class AuthService {
  /** When using BasicAuth in Springboot */
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


  /**  When using FormLogin in Springboot  */
  loginUserForm(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);

    const options = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
      },
      timeout: 5000
    };

    return http.post("/login", params, options);
  }

  /** sends the whole form to Server */
  registerUser({ email, fullname, password, confirmPass }: User) {
    return http.post("/auth/register", {
      fullname,
      email,
      password,
      confirmPass
    });
  }

  /** Obviously does what it says */
  logoutUser() {
    return http.post("/logout");
  }


}

export default new AuthService();
