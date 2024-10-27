import { IconNotes, IconBuildingStore, IconMoneybag, IconUser } from "@tabler/icons-react"
import CardDashboard from "../components/cardDashboard"
import ChartSales from "@/components/chartSales"
import useFetchDataDashboard from "@/hooks/useFetchDataDashboard"
import { toast } from "react-toastify"
import { formatRupiah } from "@/libs/formatRupiah"

export default function Home() {

    const { data, isLoading } = useFetchDataDashboard({ onError: () => notify() });

    const listCardTop = data ? [
        {
            title: "Orders",
            color: "bg-blue-500",
            value: data.totalOrders,
            icon: (
                <IconNotes className="flex-shrink-0 w-5 h-5 text-neutral-900 dark:text-neutral-200" />
            )
        },
        {
            title: "Products",
            color: "bg-green-500",
            value: data.totalProducts,
            icon: (
                <IconBuildingStore className="flex-shrink-0 w-5 h-5 text-neutral-900 dark:text-neutral-200" />
            )
        },
        {
            title: "Users",
            color: "bg-red-500",
            value: data.totalUsers,
            icon: (
                <IconUser className="flex-shrink-0 w-5 h-5 text-neutral-900 dark:text-neutral-200" />
            )
        },
        {
            title: "Revenue",
            color: "bg-yellow-500",
            value: formatRupiah(data.resultTotal),
            icon: (
                <IconMoneybag className="flex-shrink-0 w-5 h-5 text-neutral-900 dark:text-neutral-200" />
            )
        },
    ] : [];

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


    return (
        <main className="w-full">
            <div className="flex flex-col items-center">
                {
                    isLoading ?
                        <center>
                            <div className="text-center">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        </center>
                        :
                        <>
                            <h1 className="text-4xl font-bold text-center">Dashboard</h1>
                            <div className="flex flex-wrap gap-5 mt-10 ">
                                {listCardTop.map((item, index) => {
                                    return (
                                        <CardDashboard key={index} color={item.color} title={item.title.toUpperCase()} value={item.value} icon={item.icon} />
                                    )
                                })}
                            </div>
                            <div className="flex flex-col gap-10">
                                <h4 className="my-10 text-xl font-semibold text-center ">Chart Revenue year</h4>
                                {data && <ChartSales value={data.dataChart} />}
                            </div>
                        </>
                }
            </div>
        </main>
    )
}