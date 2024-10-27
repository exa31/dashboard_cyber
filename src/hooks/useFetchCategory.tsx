import { getCategory } from "@/app/api/categories";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCategory({ onError }: { onError: () => void }) {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: async () => await getCategory(),
        throwOnError() {
            onError();
            return false;
        },
    })
};