import http from "../axiosconfig";

class LessonService {
  getLessonsByCourse(id: number) {
    return http.get(`/lessons/course/${id}`);
  }

  getWatchedList(courseId: number, enrollId: number) {
    return http.get(`lessons/c/${courseId}/eid/${enrollId}`);
  }
}

export default new LessonService();
