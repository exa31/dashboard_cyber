import { axiosInstanceData } from "@/libs/axios";
import { DashboardResponse } from "@/types";

export const getDataDashboard = async (token: string): Promise<DashboardResponse> => {
    return await axiosInstanceData.get("/api/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
};