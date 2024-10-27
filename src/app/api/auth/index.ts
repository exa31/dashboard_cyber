import { axiosInstanceData } from "@/libs/axios";
import { LoginPost, LoginResponse } from "@/types";

export const login = async (data: LoginPost): Promise<LoginResponse> => {
    return await axiosInstanceData.post(`/auth/login`, data).then(res => res.data);
};  