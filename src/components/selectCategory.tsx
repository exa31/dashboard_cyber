import { Category } from "@/types"
// import { ErrorMessage } from "formik"

export default function SelectCategory({ name, label, options, value = 'Select Category', handleChange }: { name: string, label: string, options: Category[], value?: string, handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select name={name} onChange={handleChange} value={value} className="select select-bordered">
                <option disabled value={"Select Category"}>Select Category</option>
                {options.map((option, index) => {
                    return (
                        <option key={index} value={option.name}>{option.name}</option>
                    )
                })}
            </select>
        </label>
    )
}