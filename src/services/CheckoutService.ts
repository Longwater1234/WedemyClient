import { PaymentObj } from "@/types";
import http from "../axiosconfig";

class CheckoutService {
    /* get client-token from server */
    getToken() {
        return http.get("/checkout/token");
    }

    pay(load: PaymentObj) {
        return http.post("/checkout/complete", load)
    }


}

export default new CheckoutService();
