import { Course } from '@/types';
import http from '../axiosconfig';


class CourseService {

    getAll() {
        return http.get("/courses/all");
    }

    getById(id: number) {
        return http.get(`/courses/id/${id}`);
    }

    getByCategory(category: string) {
        return http.get(`/courses/cat/${category}`);
    }

    createOne(payload: Course){
        return http.post("/courses/create", payload);
    }

    findByTitle(title: string) {
        return http.get(`/courses/search?title=${title}`);
    }
}

export default new CourseService();