


import { useState, useEffect } from 'react'
import { ExpensesList } from './components'
import logic from '../logic'

export default function ExpensePage({ onExpensePageButtonClick }) {

    return (
        <main className='p-6'>
            <div className='bg-gary-200 rounded-lg p-6'>
                <h1 className='text-xl font-semibold text-center'>Lista de gastos</h1>

                <div className='mt-6'>
                    <ExpensesList onExpensePageButtonClick={onExpensePageButtonClick}
                    />
                </div>
            </div>
        </main>
    )
}