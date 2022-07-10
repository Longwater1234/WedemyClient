import { User } from "@/types";
import http from "../axiosconfig";

class ProfileService {
    /** get logged in user's summary */
    getUserSummary() {
        return http.get("/profile/summary");
    }

    /** get basic info */
    getUserDetails() {
        return http.get("/profile/mine");
    }

    updateMine(user: User) {
        return http.put("/profile/mine", user);
    }

}

export default new ProfileService();
