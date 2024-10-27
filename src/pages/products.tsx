import type { Product, Search } from "@/types";
import useFetchProducts from "@/hooks/useFetchProducts";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { formatRupiah } from "@/libs/formatRupiah";
import { Link } from "react-router-dom";
import useDeleteProducts from "@/hooks/useDeleteProducts";
import Input from "@/components/input";
import Pagination from "@/components/pagination";
import { useState } from "react";

export default function Products() {

    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const notify = () =>
        toast("ups, something went wrong, please try again", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    const { data, isLoading, refetch } = useFetchProducts({ onError: () => notify(), currentPage, search });
    const { mutate } = useDeleteProducts({ onError: () => toast.error('Failed delete product😓'), onSuccess: () => toast.success('Success delete product😎') });

    const changePage = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            refetch();
        }
    };

    const handleSearch = (e: Search) => {
        e.preventDefault();
        console.log("e.target.search.value")
        setSearch(e.target.search.value);
        setCurrentPage(1);
        refetch();
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="w-full overflow-x-auto">
            <h1 className="text-2xl font-bold text-center text-black">Products</h1>
            <div className="flex justify-between mx-4">
                <form action="" onSubmit={handleSearch} className="flex items-center space-x-4">
                    <Input placeholder="Search Product" value={search} handleChange={handleChangeSearch} type="text" name="search" />
                    <button type="submit" className="btn btn-secondary">Search</button>
                </form>
                <Link to="add-products" className="btn btn-primary">Add Product</Link>
            </div>
            <table className="table table-zebra">
                <thead>
                    <tr className="font-bold text-black">
                        <th>No</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {isLoading ? null : (
                    <tbody>
                        {data?.products.map((product: Product, index: number) => (
                            <tr key={product._id}>
                                <td>{((currentPage - 1) * 12) + index + 1}</td>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category.name}</td>
                                <td>{formatRupiah(product.price)}</td>
                                <td>
                                    <div className="flex flex-row space-x-8 fle">
                                        <Link
                                            className="btn btn-info"
                                            to={`edit-products/${product._id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => {
                                                mutate(product._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            {isLoading ? <center>
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </center> :
                <div className="flex justify-center m-4">
                    <Pagination total={data!.page} currentPage={currentPage} setCurrentPage={changePage} />
                </div>
            }
            <ToastContainer />
        </div>
    );
}
