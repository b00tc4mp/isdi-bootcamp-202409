import { getDecimalToTimeFormat } from "../../logic/helpers";

export default function ActivityTable({ activities, packInfo }) {
    return (
        <table className="mt-5 table-auto border-collapse bg-white shadow-md rounded">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs border-b border-gray-200">
                <tr className="bg-color_Grey">
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Operation</th>
                    <th scope="col" className="px-6 py-3">Remaining</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {activities.slice().reverse().map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 odd:bg-gray-50 even:bg-gray-100">
                        <td className="px-6 py-3 text-sm">{activity.description}</td>
                        <td className="px-6 py-3 text-sm">{new Date(activity.date).toLocaleString()}</td>
                        <td className="px-6 py-3 text-sm">
                            {activity.operation === 'manual adjustment' ? ('Manual Adjustment') : packInfo.unit === 'hours' ? (
                                // PACK TIPO HORAS
                                activity.operation === 'add'
                                    ? `+ ${getDecimalToTimeFormat(activity.quantity)} h`
                                    : `- ${getDecimalToTimeFormat(activity.quantity)} h`
                            ) : (
                                // PACK TIPO UNIDADES
                                activity.operation === 'add'
                                    ? `+ ${activity.quantity} un.`
                                    : `- ${activity.quantity} un.`
                            )}
                        </td>
                        <td className="px-6 py-3 text-sm">
                            {packInfo.unit === 'hours'
                                ? `${getDecimalToTimeFormat(activity.remainingQuantity)} h`
                                : `${activity.remainingQuantity} un.`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}