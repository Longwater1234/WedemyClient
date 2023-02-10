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

  findByTitle(title: string) {
    return http.get(`/courses/search?title=${title}`);
  }

  getObjectivesByCourse(id: number) {
    return http.get(`/objectives/course/${id}`);
  }

  getAllCategories() {
    return http.get("/courses/categories");
  }
}

export default new CourseService();
