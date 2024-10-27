export default function SelectDeliveryStatus({ name, label, options, value = 'Select Category', handleChange }: { name: string, label: string, options: string[], value?: string, handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select name={name} onChange={handleChange} value={value} className="select select-bordered">
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option}>{option}</option>
                    )
                })}
            </select>
        </label>
    )
}