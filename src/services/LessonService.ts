import { VideoRequest } from "@/types";
import http from "../axiosconfig";

class LessonService {
    getLessonsByCourse(id: number) {
        return http.get(`/lessons/course/${id}`);
    }

    buildPlayLink(obj: VideoRequest) {
        return http.post("/lessons/videolink/builder", obj);
    }
}

export default new LessonService();
