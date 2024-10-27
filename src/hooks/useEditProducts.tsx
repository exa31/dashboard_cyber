
import { updateProducts } from "@/app/api/products";
import { ProductPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useEditProducts({ onError, id }: { onError: () => void, id: string }) {
    const [cookies] = useCookies(['token']);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: ProductPost) => await updateProducts(id, data, cookies.token),
        onError,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['products'], refetchType: 'all' }),
                queryClient.invalidateQueries({ queryKey: ['SingleProducts', id], refetchType: 'all' })
            ]);
            navigate('/products');

        }
    })
}