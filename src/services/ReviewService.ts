import http from "../axiosconfig";

class ReviewService {
  getByCourse(courseId: number) {
    return http.get(`reviews/course/${courseId}`);
  }

  addNew() {

  }

}

export default new ReviewService();
