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

  getReciept(transactionId: string) {
    return http.get(`/sales/details/${transactionId}`)
  }

}

export default new EnrollService();
