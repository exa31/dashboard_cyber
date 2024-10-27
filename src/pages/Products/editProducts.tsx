import useFetchSingleProducts from "@/hooks/useFetchSingleProducts";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from 'formik';
import Input from "@/components/input";
import SelectCategory from "@/components/selectCategory";
import InputFile from "@/components/inputFile";
import { EditProductsSchema } from "@/Schema";
import ImagePreview from "@/components/imagePreview";
import useEditProducts from "@/hooks/useEditProducts";
import TextArea from "@/components/textArea";
import { ProductPost } from "@/types";

export default function EditProducts() {

    const notify = () => toast("ups, something went wrong, please try again", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    },);

    const { id } = useParams<{ id: string }>();

    const { data, isLoading, setImageDetails, imageDetails, imageThumbnail, setImageThumbnail } = useFetchSingleProducts({
        onError: () => {
            notify();
        },
        id: id as string,
    })

    const { mutate } = useEditProducts({
        onError: () => {
            notify();
        },
        id: id as string,
    });


    const [product, category] = data ?? [];


    const formik = useFormik({
        initialValues: { image_thumbnail: product?.image_thumbnail, image_details: product?.image_details, name: product?.name, price: product?.price, category: product?.category.name, description: product?.description },
        validationSchema: EditProductsSchema,
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

            if (formik.values.image_details!.length > 3) {
                return toast.warning("Max image 3");
            }
            if (formik.values.image_details?.length === 0) {
                return toast.warning("Image Details is required");
            }
            mutate(data as unknown as ProductPost);
        }
    })

    const handleImageThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upload = e.target.files ? e.target.files[0] : null;
        if (upload) {
            const url = URL.createObjectURL(upload);
            setImageThumbnail(url);
            formik.setFieldValue(e.target.name, upload);
        }
    };

    const handleCloseImageDetails = (index: number) => {
        const newImageDetails = imageDetails.filter((_image, idx) => idx !== index);
        const newFormDataImageDetails = formik.values.image_details!.filter((_image, idx) => idx !== index);
        formik.setFieldValue("image_details", newFormDataImageDetails);
        setImageDetails(newImageDetails);
    };

    const handleImageDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
        const upload = e.target.files;
        if (upload && upload.length > 3) {
            return toast.warning("Max image 3");
        }
        if (upload?.length === 0) return;
        if (upload && imageDetails.length + upload.length > 3) {
            return toast.warning("Max image 3");
        }
        if (upload) {
            const files: string[] = [];
            Array.from(upload).forEach((file) => {
                const img = URL.createObjectURL(file)
                files.push(img);
            });
            setImageDetails([...imageDetails, ...files]);
            formik.setFieldValue(e.target.name, [...imageDetails, ...upload]);
        }
    };

    return (
        <div className="container mx-auto my-8 ">
            <h1 className="text-3xl font-bold text-center">Edit Products</h1>
            <div>
                {isLoading ? (
                    <center className="mt-28"><span className="loading loading-spinner loading-lg"></span></center>
                ) : (
                    <>

                        <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
                            <Input name="name" handleChange={formik.handleChange} label="Name Products" placeholder="Name Products" type="text" value={formik.values.name} />
                            <div>
                                {formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
                            </div>
                            <Input name="price" handleChange={formik.handleChange} label="Price" placeholder="Price" type="number" value={formik.values.price} />
                            <div className="w-full max-w-xs text-start">
                                {formik.errors.price && <div className="text-red-500">{formik.errors.price}</div>}
                            </div>
                            <SelectCategory name="category" handleChange={formik.handleChange} label="Category" options={category!} value={formik.values.category} />
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
                                <ImagePreview image={imageThumbnail} />
                            </div>
                            <InputFile name="image_details" handleChange={handleImageDetails} label="Image Details" multiple={true} />
                            <div className="w-full max-w-xs text-start">
                                {formik.errors.image_details && <div className="text-red-500">{formik.errors.image_details}</div>}
                            </div>
                            <div className="flex my-10 space-x-4">
                                {imageDetails.map((image, index) => (
                                    <ImagePreview key={index} index={index} onClose={handleCloseImageDetails} image={image} />
                                ))}
                            </div>
                            <div className="flex space-x-4">
                                <Link to="/products" className="mb-10 btn btn-info">Cancel</Link>
                                <button type="submit" className="mb-10 btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}