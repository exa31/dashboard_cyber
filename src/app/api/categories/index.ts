import { axiosInstanceData } from "@/libs/axios";

export const getCategory = async () => {
    return await axiosInstanceData.get(`/api/categories`).then(res => res.data);
};