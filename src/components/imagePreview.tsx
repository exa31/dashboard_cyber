// import imgError from '@/assets/imgError.png';
import { IconX } from "@tabler/icons-react";

export default function ImagePreview({ image, onClose, index }: { image: string, onClose?: (id: number) => void, index?: number }) {
    return (
        <div className="relative flex items-center justify-center">
            <img src={image.includes('http') ? image : `${import.meta.env.VITE_BASE_URL}/images${image}`} alt="" className="object-contain w-40" />
            {
                onClose &&
                <IconX onClick={() => onClose(index!)} className="absolute top-0 right-0 w-6 h-6 text-red-500 bg-gray-300 rounded-full cursor-pointer" />
            }
        </div>
    )
}