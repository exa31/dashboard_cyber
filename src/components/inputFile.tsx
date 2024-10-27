export default function InputFile({ name, label, handleChange, multiple }: { name: string, label: string, handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, multiple?: boolean }) {
    return (
        <label className="w-full max-w-xs form-control">
            <div className="label">
                <span className="label-text">{label}</span>

            </div>
            <input type="file" name={name} onChange={handleChange} className="w-full max-w-xs file-input file-input-bordered" multiple={multiple} />
        </label>
    )
}