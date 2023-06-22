import type { VideoRequest, WatchStatus } from "@/interfaces/custom";
import { httpUtil } from "@/util/http_util";

class EnrollService {
  checkStatus(courseId: number) {
    return httpUtil.get(`/enroll/status/c/${courseId}`);
  }

  getPurchaseHistory() {
    return httpUtil.get("/sales/mine");
  }

  getItemsByTransactionId(id: string) {
    return httpUtil.get(`/sales/mine/${id}`);
  }

  /** for Profile page */
  getMySummary() {
    return httpUtil.get("/enroll/progress/summary/");
  }

  /** courses with percent progress */
  getAllMyCourses(page: number = 0) {
    return httpUtil.get(`/enroll/mine?page=${page}`);
  }

  getLastViewed(courseId: number) {
    return httpUtil.get(`/enroll/resume/c/${courseId}`);
  }

  updateStatus(body: Partial<WatchStatus>) {
    return httpUtil.post("/enroll/watched", body);
  }

  buildPlayLink(body: VideoRequest) {
    return httpUtil.post("/enroll/videolink/builder", body);
  }
}

export default new EnrollService();
