import { updateOrders } from "@/app/api/orders";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

export default function useUpdateOrders({ onError, onSuccess, refetch, setOpenModal }: { onError: () => void, onSuccess: () => void, refetch: () => void, setOpenModal: (value: boolean) => void }) {
    const [cookies] = useCookies(['token']);
    return useMutation({
        mutationFn: async ({ delivery_status, id }: { delivery_status: string, id: string }) => await updateOrders(cookies.token, id, delivery_status),
        onError,
        onSuccess: () => {
            onSuccess();
            refetch();
            setOpenModal(false);
        }
    });
};