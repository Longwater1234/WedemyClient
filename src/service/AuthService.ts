import type { AxiosRequestConfig } from "axios";
import { httpUtil } from "@/util/http_util";
import type { LoginRequest } from "@/interfaces/custom";
import type { User } from "@/interfaces/wedemy";

class AuthService {
  /** Login using custom JSON login */
  loginUser({ email, password, responseToken }: LoginRequest) {
    const url = "/auth/login";
    const body = { email, password };
    return httpUtil.post(url, body, { params: { responseToken: responseToken } });
  }

  /**  Login using Spring FormLogin  */
  loginUserForm(email: string, password: string, responseToken: string) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    params.append("responseToken", responseToken);

    const options: AxiosRequestConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
      },
      timeout: 5000
    };

    return httpUtil.post("/login", params, options);
  }

  /** Register submits form to Server */
  registerUser(load: Partial<User>, responseToken: string) {
    return httpUtil.post("/auth/register", load, { params: { responseToken: responseToken } });
  }
}

export default new AuthService();
