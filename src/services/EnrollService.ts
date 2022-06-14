import { VideoRequest, WatchStatus } from "@/types";
import http from "../axiosconfig";

class EnrollService {
  checkStatus(courseId: number) {
    return http.get(`/enroll/status/c/${courseId}`);
  }

  getPurchaseHistory() {
    return http.get("/sales/mine");
  }

  getItemsByTransactionId(id: string) {
    return http.get(`sales/mine/${id}`);
  }

  /* enrolled courses with percent progress */
  getMySummary() {
    return http.get("/enroll/progress/summary/");
  }

  getAllMyCourses(page: number = 0) {
    return http.get(`/enroll/mine?page=${page}`);
  }

  getLastViewed(courseId: number) {
    return http.get(`enroll/resume/course/${courseId}`);
  }

  updateStatus(obj: WatchStatus) {
    return http.post("/enroll/watched", obj);
  }

  buildPlayLink(obj: VideoRequest) {
    return http.post("/enroll/videolink/builder", obj);
  }
}

export default new EnrollService();
