import http from "../axiosconfig";

class EnrollService {

  checkStatus(courseId: number) {
    return http.get(`/enroll/status/c/${courseId}`);
  }
}

export default new EnrollService();
