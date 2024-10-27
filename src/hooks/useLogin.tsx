import { login } from "@/app/api/auth";
import { NameProvider } from "@/context";
import { LoginPost } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useLogin({ onError }: { onError: () => void }) {
    const [cookies, setCookie] = useCookies(['token']);
    const nameContext = useContext(NameProvider);
    const { setName } = nameContext!;
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: LoginPost) => await login(data),
        onSuccess: (data) => {
            console.log(data)
            if (data.role !== 'admin') {
                onError();
                return false;
            }
            setCookie('token', data.token, { sameSite: 'strict', secure: true });
            setName(data.name);
            navigate('/');
        },
        onError: () => {
            onError()
            return false;
        },
    })
};