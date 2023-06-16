import type { AxiosRequestConfig } from "axios";
import { httpUtil } from "@/util/http_util";
import type { Review } from "@/interfaces/wedemy";
import type { SortParam } from "@/interfaces/custom";

class ReviewService {
  /** get reviews, paged & sorted */
  getByCourseId(courseId: number, page: number = 0, sortBy: SortParam) {
    const options: AxiosRequestConfig = {
      params: {
        page,
        sortBy
      }
    };
    return httpUtil.get(`reviews/course/${courseId}`, options);
  }

  /** insert new review */
  addNew(review: Partial<Review>) {
    return httpUtil.post("/reviews/", review);
  }

  getMineOnCourse(courseId: number) {
    return httpUtil.get(`/reviews/mine/c/${courseId}`);
  }

  /** edit review */
  editMine(id: number, review: Partial<Review>) {
    return httpUtil.put(`/reviews/id/${id}`, review);
  }
}

export default new ReviewService();
