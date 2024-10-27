import { createProducts } from "@/app/api/products";
import { ProductPost } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useAddProducts({ onError }: { onError: () => void }) {
    const [cookies] = useCookies(['token']);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: ProductPost) => await createProducts(data, cookies.token),
        onError,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'], refetchType: 'all' })
            navigate('/products');
        }
    })
} 