import http from "../axiosconfig";

class WishlistService {
  addNew(courseId: number) {
    return http.post(`/wishlist/course/${courseId}`);
  }

  removeOneByCourse(courseId: number) {
    return http.delete(`/wishlist/course/${courseId}`);
  }

  removeOneById(wishlistId: number) {
    return http.delete(`/wishlist/id/${wishlistId}`);
  }

  getAllMine() {
    return http.get("/wishlist/mine");
  }

  checkifWishlisted(courseId: number) {
    return http.get(`/wishlist/status/c/${courseId}`);
  }
}

export default new WishlistService();
