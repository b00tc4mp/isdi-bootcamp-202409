


import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { Button } from '../library'
import { errors } from 'com'
import { Alert, Confirm } from '../components'
import { convertEuroComaStringToNumber } from '../../util'
import EditExpenseModal from './EditExpenseModal'

const { SystemError } = errors

export default function ExpensesList({ onExpensePageButtonClick }) {
    const [expenses, setExpenses] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editingExpense, setIsEditingExpense] = useState({})
    const { Alert, Confirm } = useContext()

    useEffect(() => {
        try {
            logic.getExpenses()
                .then(expenses => {
                    setExpenses(expenses)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        Alert('Lo sentimos, intentalo de nuevo mas tarde')
                    else
                        alert(error.message)
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    const onChangeAmount = (event) => {
        let inputValue = event.target.value
        inputValue = inputValue.replace(',', '.')
        const amount = parseFloat(inputValue)
        setAmount(amount)
    }

    const updateExpenseHandler = (expense) => {
        setIsEditingExpense(expense)
        return setIsEditing(true)
    }


    const deleteExpenseHandler = (expenseId) => {
        console.log('Expense ID:', expenseId)
        try {
            logic.deleteExpense(expenseId)
                .then(() => {
                    const updatedExpenses = expenses.filter(expense => expense.id !== expenseId)
                    setExpenses(updatedExpenses)
                    alert('Gasto eliminado con éxito.')
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            Alert('Ocurrió un error inesperado.')
            console.error(error)
        }
    }

    const handleOnSaveEditExpenseHandler = (expense) => {
        const { id: expenseId, amount: newAmount, type: newType, provider: newProvider } = expense
        logic.updateExpense(expenseId, newAmount, newType, newProvider)
            .then(() => {
                const updatedExpenses = expenses.map(expense =>
                    expense.id === expenseId ? { ...expense, amount: newAmount, type: newType, provider: newProvider } : expense
                )
                setExpenses(updatedExpenses)
                Confirm('Gasto actualizado con éxito.')
                setIsEditing(false)
                setIsEditingExpense({})
            })
            .catch((error) => {
                Alert('No se pudo actualizar el gasto.')
                console.error(error)
                setIsEditing(false)
                setIsEditingExpense({})
            })
    }


    return (
        <main>
            {isEditing && <EditExpenseModal expense={editingExpense} onClose={() => setIsEditing(false)} onSave={handleOnSaveEditExpenseHandler}></EditExpenseModal>}
            <div className="p-6 rounded-lg bg-gray-200">
                <h1 className="flex items-center justify-center text-xl font-semibold">Lista de Gastos</h1>

                <div className="flex justify-center container mx-auto bg-gray-100 rounded-lg p-6 mt-4">
                    <ul>
                        {expenses.map((expense) => (
                            <li key={expense.id} className="flex justify-between items-center mb-4">
                                <div>
                                    <span onChange={onChangeAmount}> - {expense.type}</span>
                                    <span> - {expense.amount} €</span>
                                    <span> {new Date(expense.date).toLocaleDateString()} </span>
                                </div>
                                <Button
                                    onClick={() => updateExpenseHandler(expense)}>Editar</Button>
                                <button
                                    onClick={() => deleteExpenseHandler(expense.id)}
                                    className="text-sky-700 hover:text-sky-700"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='text-center mt-4'>
                    <Button type="submit" onClick={onExpensePageButtonClick}>Gastos</Button>
                </div>
            </div>
        </main>
    )
}