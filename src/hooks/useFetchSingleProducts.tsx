
import { getCategory } from "@/app/api/categories";
import { getSingleProducts } from "@/app/api/products";
import { Category, Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useFetchSingleProducts({ onError, id }: { onError: () => void, id: string }): {
    data: [Product, Category[]] | undefined;
    isLoading: boolean;
    imageThumbnail: | string;
    imageDetails: string[];
    setImageThumbnail: (value: | string) => void;
    setImageDetails: (value: string[]) => void;
} {
    const [imageThumbnail, setImageThumbnail] = useState<string>('');
    const [imageDetails, setImageDetails] = useState<string[]>(['']);
    const { data, isLoading } = useQuery<[Product, Category[]]>({
        queryKey: ["SingleProducts", id],
        queryFn: async () => await Promise.all([
            getSingleProducts(id),
            getCategory()
        ]),
        throwOnError() {
            onError()
            return false;
        },
        retry: 1,
    }
    );

    useEffect(() => {
        if (data) {
            const [product] = data;
            setImageThumbnail(product.image_thumbnail);
            setImageDetails(product.image_details);
        }
    }, [data]);
    return {
        data,
        isLoading,
        imageThumbnail,
        imageDetails,
        setImageThumbnail,
        setImageDetails
    }
}