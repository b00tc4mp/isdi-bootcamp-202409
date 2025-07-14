export default function SettingsSection({ title, value, children, }) {
    return (
        <div className={`bg-skin rounded-xl shadow-sm`}>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-darkest-blue font-semibold">{title}</h3>
                    <span className="text-dark-blue">{value}</span>
                </div>
                {children}
            </div>
        </div>
    )
}