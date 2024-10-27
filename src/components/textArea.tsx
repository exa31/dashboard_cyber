export default function TextArea({ value, placeholder, name, label, handleChange }: { name: string, label: string, handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder: string, value: string }) {
    return (
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <textarea value={value} name={name} className="h-24 textarea textarea-bordered" onChange={handleChange} placeholder={placeholder}></textarea>
        </label>
    )
};