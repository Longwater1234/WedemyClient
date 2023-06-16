import { httpUtil } from "@/util/http_util";
import type { PaymentObj } from "@/interfaces/custom";

class CheckoutService {
  /** get Braintree client token from server */
  getToken() {
    return httpUtil.get("/checkout/token");
  }

  /** submit payment info to server */
  pay(load: PaymentObj) {
    return httpUtil.post("/checkout/complete", load);
  }
}

export default new CheckoutService();
