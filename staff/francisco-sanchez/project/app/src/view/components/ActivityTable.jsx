export default function ActivityTable({ activities }) {
    return (
        <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
            <thead>
                <tr className="bg-color_Grey">
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Operation</th>
                    <th className="border px-4 py-2">Remaining</th>
                </tr>
            </thead>
            <tbody>
                {activities.slice().reverse().map((activity) => (
                    <tr key={activity.id}>
                        <td className="border px-4 py-2">{activity.description}</td>
                        <td className="border px-4 py-2">{activity.formatedDate}</td>
                        <td className="border px-4 py-2">
                            {activity.operation === 'add'
                                ? `+${activity.formattedOperation}`
                                : `-${activity.formattedOperation}`}
                        </td>
                        <td className="border px-4 py-2">{activity.formattedRemaining}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}