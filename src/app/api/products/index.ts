import { axiosInstanceData, axiosInstancePostDataProducts } from '@/libs/axios';
import { ProductPost } from '@/types';


export const getProducts = async (page: number, search: string) => {
    return await axiosInstanceData.get(`/api/products?limit=12&skip=${(page - 1) * 12}&q=${search}`).then(res => res.data);
};

export const getSingleProducts = async (id: string) => {
    return await axiosInstanceData.get(`/api/products/${id}`).then(res => res.data);
};

export const createProducts = async (data: ProductPost, token: string) => {
    return await axiosInstancePostDataProducts.post(`/api/products`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.data);
};

export const updateProducts = async (id: string, data: ProductPost, token: string) => {
    return await axiosInstancePostDataProducts.put(`/api/products/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.data);
};

export const deleteProducts = async (id: string, token: string) => {
    return await axiosInstanceData.delete(`/api/products/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.data);
};

export const postProducts = async (data: ProductPost) => {
    return await axiosInstanceData.post(`/api/products`, data).then(res => res.data);
};