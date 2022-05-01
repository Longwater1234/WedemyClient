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


}

export default new ProfileService();
