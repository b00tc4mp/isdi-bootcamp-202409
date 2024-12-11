export default function Radio({ id, name, value, checked, onChange, children }) {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
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