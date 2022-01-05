import http from "../axiosconfig";

class LessonService {

    getLessonsByCourse(id: number) {
        return http.get(`/lessons/course/${id}`);
    }
}

export default new LessonService();