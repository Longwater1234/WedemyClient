import { httpUtil } from "@/util/http_util";

class WishlistService {
  addNew(courseId: number) {
    return httpUtil.post(`/wishlist/course/${courseId}`);
  }

  removeOneByCourse(courseId: number) {
    return httpUtil.delete(`/wishlist/course/${courseId}`);
  }

  removeOneById(wishlistId: number) {
    return httpUtil.delete(`/wishlist/id/${wishlistId}`);
  }

  getMinePaged(page: number = 0) {
    return httpUtil.get("/wishlist/mine", { params: { page } });
  }

  checkIsWishlist(courseId: number) {
    return httpUtil.get(`/wishlist/status/c/${courseId}`);
  }
}

export default new WishlistService();
