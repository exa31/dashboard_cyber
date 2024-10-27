import { axiosInstanceData } from "@/libs/axios";
import { OrderResponse } from "@/types";

export const getOrders = async (token: string, currentPage: number): Promise<OrderResponse> => {
    return await axiosInstanceData.get(`/api/all-orders?limit=12&skip=${(currentPage - 1) * 12}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
};

export const updateOrders = async (token: string, id: string, status_delivery: string) => {
    return await axiosInstanceData.put(`/api/orders/${id}`, { status_delivery }, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
};