


import { useState, useEffect } from 'react'
import useContext from '../useContext'
import { Input, Button, Form, Field, Label } from '../library'
import { Alert, Confirm } from '../components'
import logic from '../../logic'
import { convertEuroComaStringToNumber, expenseTypes } from '../../util'
import { errors } from 'com'

const { SystemError } = errors

export default function Expense({ onAddExpense, expense, expenseId }) {
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('')
    const [provider, setProvider] = useState('')
    const { alert, confirm } = useContext()

    const onChangeAmount = (event) => {
        let inputValue = event.target.value
        const amount = convertEuroComaStringToNumber(inputValue)
        setAmount(amount)
    }

    const handleSubmit = () => {

        const currentDate = new Date().toISOString()

        logic.addExpense(amount, type, provider, currentDate)
            .then(() => {
                setAmount(0)
                setType('')
                setProvider('')

                const newExpense = { amount, type, provider }
                onAddExpense(newExpense)
                alert('Gasto añadido con éxito.')
            })
            .catch((error) => {
                if (error instanceof SystemError) {
                    alert('Lo sentimos, inténtelo de nuevo más tarde.')
                } else {
                    alert('Ocurrió un error: ' + error.message)
                }
                console.error(error)
            })
    }

    return (
        <main>
            <div className="p-6 rounded-lg bg-gray-200">
                <h1 className="flex items-center justify-center text-xl font-semibold">Añadir gasto</h1>

                <div className="flex justify-center container mx-auto bg-gray-100 rounded-lg p-6 mt-4">
                    <Form htmlFor="form" onSubmit={handleSubmit}>
                        <Field>
                            <div>
                                <Label htmlFor="amount">Cantidad (€)</Label>
                                <Input
                                    type="text"
                                    id="amount"
                                    value={amount}
                                    onChange={onChangeAmount}
                                    placeholder="Cantidad"
                                    className="w-full p-3 border-2 rounded-lg" />
                            </div>
                        </Field>

                        <Field>
                            <div className='mt-2'>
                                <Label htmlFor="type">Tipo de gasto</Label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full p-1 border-2 border-[var(--color)] rounded-lg "
                                >
                                    <option value="">Tipo de gasto</option>
                                    {expenseTypes.map((expenseType) => (
                                        <option key={expenseType.key} value={expenseType.key}>
                                            {expenseType.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Field>

                        <Field>
                            <div className='mt-2'>
                                <Label htmlFor="provider">Proveedor</Label>
                                <Input
                                    type="text"
                                    id="provider"
                                    value={provider}
                                    onChange={(e) => setProvider(e.target.value)}
                                    placeholder="Proveedor"
                                />
                            </div>
                        </Field>

                        <div className="flex justify-center mt-6">
                            <Button type="submit">Añadir gasto</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </main>
    )
}