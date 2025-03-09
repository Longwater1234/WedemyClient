import type { AxiosRequestConfig } from "axios";
import { httpUtil } from "@/util/http_util";
import type { LoginRequest, RegisterRequest } from "@/interfaces/custom";

class AuthService {
  /** Login using custom Springboot JSON login */
  loginUser(loginRequest: LoginRequest, responseToken: string) {
    const url = "/auth/login";
    const { email, password } = loginRequest;
    const body = { email, password };
    return httpUtil.post(url, body, { params: { responseToken: responseToken } });
  }

  /**  Login using Springboot FormLogin  */
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
  registerUser(payload: RegisterRequest, responseToken: string) {
    return httpUtil.post("/auth/register", payload, { params: { responseToken: responseToken } });
  }
}

export default new AuthService();
