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
    return http.get(`/sales/mine/${id}`);
  }

  /** for Profile page */
  getMySummary() {
    return http.get("/enroll/progress/summary/");
  }

  /** courses with percent progress */
  getAllMyCourses(page: number = 0) {
    return http.get(`/enroll/mine?page=${page}`);
  }

  getLastViewed(courseId: number) {
    return http.get(`/enroll/resume/c/${courseId}`);
  }

  updateStatus(body: WatchStatus) {
    return http.post("/enroll/watched", body);
  }

  buildPlayLink(body: VideoRequest) {
    return http.post("/enroll/videolink/builder", body);
  }
}

export default new EnrollService();
