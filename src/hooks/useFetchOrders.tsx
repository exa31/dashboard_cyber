import { getOrders } from "@/app/api/orders";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useFetchOrders({ onError, currentPage }: { onError: () => void, currentPage: number }) {
    const [cookies] = useCookies(['token']);
    return useQuery({
        queryKey: ["orders", currentPage],
        queryFn: async () => await getOrders(cookies.token, currentPage),
        throwOnError() {
            onError()
            return false;
        },
        retry: 1
    })

};