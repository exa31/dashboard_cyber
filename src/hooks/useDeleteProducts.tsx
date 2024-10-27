import { deleteProducts } from "@/app/api/products";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useDeleteProducts({ onError, onSuccess }: { onError: () => void, onSuccess: () => void }) {
    const [cookies] = useCookies(['token']);
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await deleteProducts(id, cookies.token),
        onError,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['products'], refetchType: 'all' });
            onSuccess();
        }
    })
};