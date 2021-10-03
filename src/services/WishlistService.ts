import http from "../axiosconfig";

class WishlistService {
    addNew(courseId: number) {
        return http.post(`/wishlist/course/${courseId}`);
    }

    removeOne(courseId: number) {
        return http.delete(`/wishlist/course/${courseId}`);
    }

    getAllMine() {
        return http.get(`/wishlist/mine`);
    }

    checkifWishlisted(courseId: number) {
        return http.get(`/wishlist/mine/${courseId}`)
    }
}

export default new WishlistService();
