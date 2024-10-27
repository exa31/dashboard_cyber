import { formatRupiah } from '@/libs/formatRupiah';
import { Chart } from '@/types';
import { LineChart, Line, CartesianGrid, XAxis, Tooltip } from 'recharts';




export default function ChartSales({ value }: { value: Chart[] }) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const data = value.map((item, index) => {
        return {
            name: month[index],
            total: item.total
        }
    });

    const formatTooltip = (value: number) => {
        return formatRupiah(value);
    };
    return (
        <LineChart width={900} height={400} data={data} margin={{ top: 50, right: 20, bottom: 0, left: 0 }}>
            <Line type="monotone" dataKey="total" strokeWidth={3} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <Tooltip formatter={formatTooltip} />
        </LineChart>
    );
}