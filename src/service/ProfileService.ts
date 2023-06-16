import { httpUtil } from "@/util/http_util";
import type { User } from "@/interfaces/wedemy";

class ProfileService {
  /** get logged in user's summary */
  getUserSummary() {
    return httpUtil.get("/profile/summary");
  }

  /** get basic info */
  getUserDetails() {
    return httpUtil.get("/profile/mine");
  }

  /** update my profile */
  updateMine(user: Partial<User>) {
    return httpUtil.put("/profile/mine", user);
  }
}

export default new ProfileService();
