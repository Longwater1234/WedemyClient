import { AxiosRequestConfig } from "axios";
import http from "../axiosconfig";

class ReviewService {
  /** get reviews, paged & sorted */
  getByCourse(courseId: number, page: number = 0, sortBy: string) {
    let options: AxiosRequestConfig = {
      params: {
        page,
        sortBy
      },
    };
    return http.get(`reviews/course/${courseId}`, options);
  }

  /** insert new review */
  addNew() {

  }

}

export default new ReviewService();
