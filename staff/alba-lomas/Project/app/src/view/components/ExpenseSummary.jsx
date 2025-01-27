


import { useState, useEffect } from 'react'
import useContext from '../useContext'
import logic from '../../logic'

export default function ExpenseSummary({ expenses }) {
    const [totalByType, setTotalByType] = useState({})
    const [totalOverall, setTotalOverall] = useState(0)

    useEffect(() => {

        logic.getSumExpenses()
            .then(sumExpenses => {
                debugger
                setTotalByType(sumExpenses)
                const overallTotal = Object.values(sumExpenses).reduce((sum, expense) => {
                    return sum + expense
                })
                setTotalOverall(overallTotal)
            })
    }, [expenses])

    return (
        <main>
            <div className="p-6 rounded-lg bg-gray-200">
                <h1 className="flex items-center justify-center text-xl font-semibold">Resumen de Gastos</h1>

                <div className="flex justify-center container mx-auto bg-gray-100 rounded-lg p-6 mt-4">
                    <div className="space-y-2 w-full">
                        {Object.keys(totalByType).map((type) => ( // muestra los totales por tipo
                            <div key={type} className="flex justify-between">
                                <span className="font-medium">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}:
                                </span>
                                <span>{totalByType[type].toFixed(2)} €</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold mt-4">
                            <span className='mr-4'>Total General:</span>
                            <span>{totalOverall.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}