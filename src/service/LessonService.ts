import { httpUtil } from "@/util/http_util";

class LessonService {
  getLessonsByCourse(id: number) {
    return httpUtil.get(`/lessons/course/${id}`);
  }

  getWatchedList(courseId: number, enrollId: number) {
    return httpUtil.get(`lessons/c/${courseId}/e/${enrollId}`);
  }
}

export default new LessonService();
