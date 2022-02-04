import http from "../axiosconfig";

class CartService {
  addNew(courseId: number) {
    return http.post(`/cart/course/${courseId}`);
  }

  removeOneByCourse(courseId: number) {
    return http.delete(`/cart/course/${courseId}`);
  } 
  
  removeOneById(cartId: number) {
    return http.delete(`/cart/id/${cartId}`);
  }

  getAllMine() {
    return http.get("/cart/mine");
  }

  checkItemInCart(courseId: number) {
    return http.get(`/cart/status/c/${courseId}`);
  }
}

export default new CartService();
