


import React, { useState } from 'react';
import { convertEuroComaStringToNumber } from '../../util';
import { Form, Field, Label, Input, Button } from '../library';
import { expenseTypes } from '../../util';

export default function EditExpenseModal({ expense, onSave, onClose }) {
    const [amount, setAmount] = useState(expense.amount)
    const [type, setType] = useState(expense.type)
    const [provider, setProvider] = useState(expense.provider)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formattedAmount = convertEuroComaStringToNumber(amount)
        onSave({ id: expense.id, amount: formattedAmount, type, provider })
        onClose()
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="p-6 rounded-lg bg-gray-200">
                <h1 className="flex items-center justify-center text-xl font-semibold">Añadir gasto</h1>
                <div className="flex justify-center container mx-auto bg-gray-100 rounded-lg p-6 mt-4">
                    <Form onSubmit={handleSubmit}>
                        <Field>
                            <div>
                                <Label htmlFor="amount">Cantidad (€)</Label>
                                <Input
                                    type="text"
                                    id="amount"
                                    defaultValue={expense.amount}
                                    onChange={(e) => setAmount(e.target.value)}
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
                                    defaultValue={expense.provider}
                                    onChange={(e) => setProvider(e.target.value)}
                                    placeholder="Proveedor"
                                />
                            </div>
                        </Field>
                        <div className="flex justify-center mt-6">
                            <Button type="submit">Editar gasto</Button>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={onClose}>Cancelar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}


/* 
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Editar Gasto</h2>
                <label className="block mb-2">
                    Tipo:
                    <input
                        className="border p-2 w-full"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    Proveedor:
                    <input
                        className="border p-2 w-full"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    Monto:
                    <input
                        className="border p-2 w-full"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
                <div className="flex justify-end gap-4">
                    <button className="text-red-500" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="text-green-500" onClick={handleSubmit}>
                        Guardar
                    </button>
                </div>
            </div> */