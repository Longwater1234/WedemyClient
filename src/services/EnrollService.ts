import http from "../axiosconfig";

class EnrollService {

  checkStatus(courseId: number) {
    return http.get(`/enroll/status/c/${courseId}`);
  }

  getAllOwnedItems(){
    return http.get('/sales/mine');
  }
}

export default new EnrollService();
