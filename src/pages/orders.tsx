import Pagination from "@/components/pagination";
import SelectDeliveryStatus from "@/components/selectDeliveryStatus";
import useUpdateOrders from "@/components/useUpdateOrders";
import useFetchOrders from "@/hooks/useFetchOrders";
import formatDate from "@/libs/formatDate";
import { formatRupiah } from "@/libs/formatRupiah";
import { Order } from "@/types";
import { IconX } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const status = ['pending', 'delivered', 'process']

export default function Orders() {
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
    const [openModal, setOpenModal] = useState(false);
    const [onSelect, setOnSelect] = useState<{ id: string, status: string }>({ id: '', status: '' });
    const modal = useRef<HTMLFormElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, refetch } = useFetchOrders({ onError: () => notify(), currentPage });
    const { mutate } = useUpdateOrders({ onError: () => toast.error('Failed update status delivery😓'), onSuccess: () => toast.success('Success update status delivery😎'), refetch, setOpenModal });

    const formik = useFormik({
        initialValues: {
            delivery_status: onSelect.status
        },
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values.delivery_status, onSelect.status)
            if (values.delivery_status === onSelect.status) {
                toast("No changes detected", {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
            mutate({ delivery_status: values.delivery_status, id: onSelect.id });
            setOnSelect({ id: '', status: '' });
            formik.resetForm();
        }
    });

    const changePage = (page: number) => {
        if (page === currentPage) return;
        setCurrentPage(page);
        refetch({ cancelRefetch: true });
    }

    const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modal.current && modal.current.contains(e.target as Node)) {
            return
        }
        setOpenModal(!openModal);
    };

    return (
        <>
            {openModal &&
                <div onClick={handleOpenModal} className="fixed bg-opacity-60 z-[1000] flex items-center w-screen h-screen text-center bg-black">
                    <form ref={modal} onSubmit={formik.handleSubmit} className="relative flex flex-col items-center w-1/2 p-10 mx-auto space-y-6 bg-white rounded-2xl" action="">
                        <IconX onClick={() => setOpenModal(!openModal)} className="absolute m-auto text-black top-2 right-2" />
                        <h1 className="text-2xl font-bold text-center text-black">Update Status delivery</h1>
                        <SelectDeliveryStatus label="Delivery status" name="delivery_status" options={status} handleChange={formik.handleChange} value={formik.values.delivery_status} />
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            }
            <div className="w-full overflow-x-auto">
                <h1 className="text-2xl font-bold text-center text-black">Orders</h1>
                <table className="table table-zebra">
                    <thead>
                        <tr className="font-bold text-black">
                            <th>No</th>
                            <th>Id</th>
                            <th>Status Delivery</th>
                            <th>Status Payment</th>
                            <th>Payment Method</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {isLoading ? null : (
                        <tbody>
                            {data?.orders.map((order: Order, index: number) => (
                                <tr key={order._id}>
                                    <td>{((currentPage - 1) * 12) + index + 1}</td>
                                    <td>{order._id}</td>
                                    <td>{order.status_delivery}</td>
                                    <td>{order.status_payment}</td>
                                    <td>{order.payment_method}</td>
                                    <td>{formatRupiah(order.total)}</td>
                                    <td>{formatDate(order.updatedAt)}</td>
                                    <td>
                                        {
                                            order.status_payment === 'completed' &&
                                            order.status_delivery !== 'cancelled' && order.status_delivery !== 'delivered' &&
                                            <div className="flex flex-row space-x-8 fle">
                                                <button
                                                    onClick={() => {
                                                        setOpenModal(true)
                                                        setOnSelect({ id: order._id, status: order.status_delivery })
                                                    }}
                                                    className="btn btn-info"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        }
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
        </>
    )
};