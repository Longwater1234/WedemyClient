import { httpUtil } from "@/util/http_util";

class CartService {
  addNew(courseId: number) {
    return httpUtil.post(`/cart/course/${courseId}`);
  }

  removeOneByCourse(courseId: number) {
    return httpUtil.delete(`/cart/course/${courseId}`);
  }

  removeOneById(cartId: number) {
    return httpUtil.delete(`/cart/id/${cartId}`);
  }

  getMinePaged(page: number = 0) {
    return httpUtil.get("/cart/mine", { params: { page } });
  }

  checkItemInCart(courseId: number) {
    return httpUtil.get(`/cart/status/c/${courseId}`);
  }

  getMyTotalBill() {
    return httpUtil.get("/cart/mine/bill");
  }
}

export default new CartService();
