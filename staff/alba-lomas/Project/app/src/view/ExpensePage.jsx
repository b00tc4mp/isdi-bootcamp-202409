


import { useState, useEffect } from 'react'
import { Expense, ExpenseSummary } from './components'
import { Button } from './library'

export default function ExpensePage({ onExpensePageButtonClick }) {
    const [expenses, setExpenses] = useState([])

    const handleAddExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense])
    }

    const handleInitialLoad = (expenses) => {
        setExpenses(() => expenses)
    }

    useEffect(() => {
        // Simulamos la carga de gastos desde un API o base de datos
        const fetchInitialExpenses = async () => {
            const initialExpenses = [
                { amount: 50, type: 'Comida', provider: 'Proveedor 1', date: '2025-01-01' },
                { amount: 30, type: 'Transporte', provider: 'Proveedor 2', date: '2025-01-02' }
            ]
            handleInitialLoad(initialExpenses)
        }

        fetchInitialExpenses()
    }, [])

    return (
        <main className="flex items-center justify-center container mx-auto space-x-14 rounded-lg p-6 mt-48">
            <div>
                <Expense onAddExpense={handleAddExpense} expenses={expenses} />
            </div>
            <div className='flex flex-col items-center justify-center rounded-lg space-y-6 p-6'>
                <ExpenseSummary expenses={expenses} onInitialLoad={handleInitialLoad} />
                <Button type="submit" onClick={onExpensePageButtonClick}>ExpenseList</Button>
            </div>
        </main>
    )
}