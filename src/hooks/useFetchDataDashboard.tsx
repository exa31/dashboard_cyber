import { getDataDashboard } from "@/app/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useFetchDataDashboard({ onError }: { onError: () => void }) {
    const [cookies] = useCookies(['token']);
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => await getDataDashboard(cookies.token),
        throwOnError() {
            onError()
            return false;
        },
        retry: 1
    })
};