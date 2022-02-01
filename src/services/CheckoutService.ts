import http from "../axiosconfig";

class CheckoutService {
    /* get client-token from server */
    getToken() {
        return http.get("/checkout/token");
    }

    

}

export default new CheckoutService();
