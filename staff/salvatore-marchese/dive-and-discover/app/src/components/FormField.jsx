const FormField = ({ fieldKey, label, value = "", onChange }) => {
    return (
        <>
            <label htmlFor={fieldKey} className="block text-sm font-semibold mb-1">{label}
            </label>
            <input type="text" id={fieldKey} name={fieldKey} value={value} onChange={onChange} className="w-full p-2 border rounded-md" />
        </>
    )
}

export default FormField