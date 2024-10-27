// import { ErrorMessage } from "formik";

export default function Input({ name, type, placeholder, label, value, handleChange }: { name: string, type: string, placeholder: string, label?: string, value?: string | number, handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type={type} placeholder={placeholder} onChange={handleChange} name={name} value={value} className="w-full max-w-xs input input-bordered" />
            <div className="label">
                {/* <ErrorMessage name={name} component="div" className="text-red-500" /> */}
            </div>
        </label>
    )
}