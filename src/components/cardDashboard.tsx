export default function CardDashboard({ title, icon, value, color }: { color: string, title: string, icon: JSX.Element, value: string | number }) {
    return (
        <div className={`w-[200px] ${color} justify-between text-white flex flex-col p-8 h-[200px] `}>
            <div className="flex justify-between ">
                <h3 className="font-bold">{title}</h3>
                {icon}
            </div>
            <h4>
                {value}
            </h4>
        </div>
    )
};