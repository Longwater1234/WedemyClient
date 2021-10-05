import { Course } from "@/types";
import http from "../axiosconfig";

class CourseService {
  getTop() {
    return http.get("/courses/top");
  }

  getById(id: number) {
    return http.get(`/courses/id/${id}`);
  }

  getByCategory(category: string) {
    return http.get(`/courses/cat/${category}`);
  }

  createOne(payload: Course) {
    return http.post("/courses/create", payload);
  }

  findByTitle(title: string) {
    return http.get(`/courses/search?title=${title}`);
  }

  getAllCategories(){
    return http.get("/courses/categories");
  }
}

export default new CourseService();
