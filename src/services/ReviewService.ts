import http from "../axiosconfig";

class ReviewService {
  getByCourse(courseId: number, pageIndex: number = 0) {
    return http.get(`reviews/course/${courseId}?page=${pageIndex}`);
  }

  addNew() {

  }

}

export default new ReviewService();
