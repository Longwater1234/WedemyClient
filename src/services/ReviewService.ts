import { AxiosRequestConfig } from "axios";
import http from "../axiosconfig";
import { Review } from "@/types";

class ReviewService {
  /** get reviews, paged & sorted */
  getByCourse(courseId: number, page: number = 0, sortBy: string) {
    let options: AxiosRequestConfig = {
      params: {
        page,
        sortBy,
      },
    };
    return http.get(`reviews/course/${courseId}`, options);
  }

  /** insert new review */
  addNew(review: Review) {
    return http.post("/reviews/", review);
  }

  getMineOnCourse(courseId: number) {
    return http.get(`/reviews/mine/c/${courseId}`);
  }

  /** edit review */
  editMine(id: number, review: Review) {
    return http.put(`/reviews/id/${id}`, review);
  }
}

export default new ReviewService();
