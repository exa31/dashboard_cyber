import { toast, ToastContainer } from "react-toastify";
import { useFormik } from 'formik';
import Input from "@/components/input";
import SelectCategory from "@/components/selectCategory";
import InputFile from "@/components/inputFile";
import { AddProductsSchema } from "@/Schema";
import ImagePreview from "@/components/imagePreview";
import TextArea from "@/components/textArea";
import { useState } from "react";
import useFetchCategory from "@/hooks/useFetchCategory";
import useAddProducts from "@/hooks/useAddProducts";
import { ProductPost } from "@/types";
import { Link } from "react-router-dom";

export default function AddProducts() {

    const notify = () => toast("ups, something went wrong, please try again", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    },);

    const { mutate, isPending } = useAddProducts({
        onError: () => {
            notify();
        },
    });

    const [image, setImage] = useState<{ image_thumbnail: string, image_details: string[] }>(
        { image_thumbnail: '', image_details: [] }
    )

    const { data, isLoading } = useFetchCategory({ onError: () => notify() });
    const formik = useFormik({
        initialValues: {
            image_thumbnail: '', image_details: null as unknown as [], name: '', price: '', category: 'Select Category', description: '',
        },
        validationSchema: AddProductsSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            const data: FormData = new FormData();
            data.append("name", formik.values.name!);
            data.append("price", formik.values.price as unknown as string);
            data.append("category", formik.values.category!);
            data.append("description", formik.values.description!);
            data.append("image_thumbnail", formik.values.image_thumbnail!);
            formik.values.image_details!.forEach((image) => {
                data.append("image_details", image);
            });
            mutate(data as unknown as ProductPost);

        }
    })

    const handleImageThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upload = e.target.files ? e.target.files[0] : null;
        if (upload) {
            const url = URL.createObjectURL(upload);
            setImage({ ...image, image_thumbnail: url });
            formik.setFieldValue(e.target.name, upload);
        }
    };

    const handleCloseImageDetails = (index: number) => {
        const newImageDetails = image.image_details.filter((_image, idx) => idx !== index);
        const newFormDataImageDetails = formik.values.image_details.filter((_image, idx) => idx !== index);
        formik.setFieldValue("image_details", newFormDataImageDetails);
        setImage({ ...image, image_details: newImageDetails });
    };

    const handleImageDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upload = e.target.files;
        if (upload && upload.length > 3) {
            return toast.warning("Max image 3");
        }
        if (upload?.length === 0) return;
        if (upload && image.image_details.length + upload.length > 3) {
            return toast.warning("Max image 3");
        }
        if (upload) {
            const files: string[] = [];
            Array.from(upload).forEach((file) => {
                const img = URL.createObjectURL(file)
                files.push(img);
            });
            setImage({ ...image, image_details: [...image.image_details, ...files] });
            formik.setFieldValue(e.target.name, [...image.image_details, ...upload]);
        }
    };
    return (
        <div className="container mx-auto my-8 ">
            <h1 className="text-3xl font-bold text-center">Add Products</h1>
            <div>
                {isLoading ? (
                    <center className="mt-28"><span className="loading loading-spinner loading-lg"></span></center>
                ) : (
                    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
                        <Input name="name" handleChange={formik.handleChange} label="Name Products" placeholder="Name Products" type="text" value={formik.values.name} />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
                        </div>
                        <Input name="price" handleChange={formik.handleChange} label="Price" placeholder="Price" type="number" value={formik.values.price} />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.price && <div className="text-red-500">{formik.errors.price}</div>}
                        </div>
                        <SelectCategory name="category" handleChange={formik.handleChange} label="Category" options={data!} value={formik.values.category} />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.category && <div className="text-red-500">{formik.errors.category}</div>}
                        </div>
                        <TextArea name="description" handleChange={formik.handleChange} label="Description" placeholder="Description" value={formik.values.description!} />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.description && <div className="text-red-500">{formik.errors.description}</div>}
                        </div>
                        <InputFile name="image_thumbnail" handleChange={handleImageThumbnail} label="Image Thumbnail" />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.image_thumbnail && <div className="text-red-500">{formik.errors.image_thumbnail}</div>}
                        </div>
                        <div className="my-10">
                            <ImagePreview image={image.image_thumbnail} />
                        </div>
                        <InputFile name="image_details" handleChange={handleImageDetails} label="Image Details" multiple={true} />
                        <div className="w-full max-w-xs text-start">
                            {formik.errors.image_details && <div className="text-red-500">{formik.errors.image_details}</div>}
                        </div>
                        <div className="flex my-10 space-x-4">
                            {image.image_details.map((image, index) => (
                                <ImagePreview key={index} index={index} onClose={handleCloseImageDetails} image={image} />
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/products" className="mb-10 btn btn-info">Cancel</Link>
                            <button type="submit" disabled={isPending} className="mb-10 btn btn-primary">Submit</button>
                        </div>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div >
    )
}