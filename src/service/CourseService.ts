import { httpUtil } from "@/util/http_util";

class CourseService {
  getTop() {
    return httpUtil.get("/courses/top");
  }

  getById(id: number) {
    return httpUtil.get(`/courses/id/${id}`);
  }

  getByCategory(category: string) {
    return httpUtil.get(`/courses/cat/${category}`);
  }

  findByTitle(title: string, page = 0) {
    return httpUtil.get("/courses/search", { params: { title, page } });
  }

  getObjectivesByCourse(id: number) {
    return httpUtil.get(`/objectives/course/${id}`);
  }

  getAllCategories() {
    return httpUtil.get("/courses/categories");
  }
}

export default new CourseService();
