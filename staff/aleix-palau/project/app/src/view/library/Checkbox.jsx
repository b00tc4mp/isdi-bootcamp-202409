export default function Checkbox({ id, value, checked, onChange, children }) {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            <label htmlFor={id} className="w-full box-border">
                {children}
            </label>
        </div>
    )
}