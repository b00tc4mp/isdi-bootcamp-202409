import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field, Button, Input, Label, TagKO, TagOK, TagWARN, Card } from '../../library';
import { ActivityTable } from '../components'
import { errors } from 'com';

import useContext from '../useContext';
import logic from '../../logic';

const { SystemError } = errors

export default function UpdateCustomerPack({ onUpdated, onPaymentAdded, onPaymentDeleted, onCancelClick, pack }) {
    const { alert, confirm } = useContext()
    const [packActivities, setPackActivities] = useState([])
    const [payments, setPayments] = useState([])
    const [formattedTime, setFormattedTime] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activities = await logic.getActivitiesByPackId(pack.id)
                setPackActivities(activities)

            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        fetchData()

        const getPayments = async () => {
            try {
                const payments = await logic.getPayments(pack.id)
                setPayments(payments)

            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
        getPayments()
    }, [])

    useEffect(() => {
        if (pack.unit !== 'units') {
            try {
                const timeFormatted = logic.getDecimalToTimeFormat(pack.remainingQuantity)
                setFormattedTime(timeFormatted)
            } catch (error) {
                console.error(error)
                setFormattedTime('')
            }
        }
    }, [pack.unit, pack.remainingQuantity])

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const {
            packDescription: { value: packDescription },
            remainingQuantity: { value: remainingQuantity },
            expiryDate: { value: expiryDate },
            packStatus: { value: packStatus }
        } = form

        try {
            logic.updatePack(pack.id, packDescription, remainingQuantity, new Date(expiryDate), packStatus)
                .then(() => {
                    alert('Pack updated successfully!', 'success')
                    onUpdated()
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    const handlePaymentSubmit = async (event) => {
        event.preventDefault()
        const { target: form } = event
        let {
            amount: { value: amount },
            paymentMethod: { value: paymentMethod } } = form

        if (!amount || !paymentMethod) {
            alert('Please provide the required information')
            return
        }

        //Check correct format for price
        let formattedAmount = amount.replace(',', '.')
        formattedAmount = formattedAmount.replace('€', '')
        amount = formattedAmount

        try {
            await logic.addPayment(pack.id, amount, pack.currency, paymentMethod)
                .then(() => {
                    alert('Payment added successfully', 'success');
                    onPaymentAdded()
                    form.reset(); // Reinicia el formulario
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const deletePaymentHandler = (event, paymentId) => {
        event.preventDefault()
        confirm('Do you want delete this item? -This action can\'t be reversed', accepted => {
            if (accepted) {
                try {
                    logic.deletePayment(paymentId)
                        .then(() => {
                            // Filtra el pago eliminado de la lista de pagos actual
                            setPayments((prevPayments) =>
                                prevPayments.filter((payment) => payment.id !== paymentId)
                            )
                            alert("Payment deleted successfully!", "success")
                            onPaymentDeleted()
                        })
                        .catch((error) => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }, 'warn')
    }

    if (!pack) {

        return <p>There was a problem loading customer pack</p>

    } else {

        return <main className="flex flex-col items-center bg-color_backgroundGrey w-full flex-grow pt-5 pb-10">
            <h2 className="text-2xl mb-4">"{pack.description}"</h2>
            <div className="flex flex-col w-full max-w-4xl px-4 space-y-6">
                <div className="pack_statuses grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    <Card
                        title="Pack Status"
                        value={pack.status}
                        valueClass={pack.status === 'Active' ? 'text-green-500' : 'text-red-500'}
                    />
                    <Card
                        title="Payment Status"
                        value={pack.paymentStatus}
                        valueClass={pack.paymentStatus === 'completed' ? 'text-green-500' : pack.paymentStatus === 'partially payed' ? 'text-yellow-500' : pack.paymentStatus === 'payment exceded' ? 'text-purple-500' : 'text-red-500'}
                    />
                    <Card
                        title="Price"
                        value={pack.price + ' ' + pack.currency || '0'}
                        valueClass="text-gray-800"
                    />
                    <Card
                        title="Payed Amount"
                        value={pack.totalPayments + ' ' + pack.currency || '0'}
                        valueClass="text-gray-800"
                    />
                    {parseFloat(pack.price) - parseFloat(pack.totalPayments) > 0 ? (
                        <Card
                            title="Pending Amount"
                            value={(parseFloat(pack.price) - parseFloat(pack.totalPayments)).toFixed(2) + ' ' + pack.currency || '0'}
                            valueClass="text-gray-800 text-red-500"
                        />) : null}
                    <Card
                        title="Original Quantity"
                        value={pack.formattedOriginal}
                        valueClass="text-gray-800"
                    />
                    <Card
                        title="Remaining Quantity"
                        value={pack.formattedRemaining}
                        valueClass="text-gray-800"
                    />
                </div>

                <form className="flex flex-col justify-items-start" onSubmit={handleSubmit} >
                    <Field>
                        <Label htmlFor="packDescription">Pack description</Label>
                        <Input className="border-2 rounded-lg" type="text" id="packDescription" placeholder="Pack name" defaultValue={pack.description} />
                    </Field>

                    {/* <Field>
                        <Label htmlFor="remainingQuantity">Remaining Quantity</Label>
                        <Input className="border-2 rounded-lg" type="text" id="remainingQuantity" placeholder="Remaining Quantity" defaultValue={pack.remainingQuantity} />
                    </Field> */}

                    <Field>
                        <Label htmlFor="remainingQuantity">Remaining Quantity</Label>
                        <Input
                            className="border-2 rounded-lg"
                            type={pack.unit === 'units' ? 'number' : 'text'}
                            id="remainingQuantity"
                            placeholder={pack.unit === 'units' ? '0' : '00:00:00'}
                            defaultValue={pack.unit === 'units' ? pack.remainingQuantity : formattedTime}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="packStatus">Pack Status</Label>
                        <select id="packStatus" name="packStatus" className="border-2 rounded-lg w-full p-2" defaultValue={pack.status} required>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </Field>
                    <Field>
                        <Label htmlFor="expiryDate">Expire Date</Label>
                        <Input className="border-2 rounded-lg w-full"
                            type="date"
                            id="expiryDate"
                            defaultValue={pack.expiryDate ? new Date(pack.expiryDate).toISOString().split('T')[0] : ''} />
                    </Field>
                    <div className="flex items-center justify-center">
                        <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">Update</Button>
                        <Button className="bg-red-800 text-white px-4 py-2 rounded-lg" onClick={handleCancelClick}>Cancel</Button>
                    </div>

                    <h2 className='text-2xl mt-10'>Activity log</h2>
                    {/* <table className="table-auto mt-4 bg-white text-black rounded-md">
                        <thead>
                            <tr className='bg-color_Grey'>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Operation</th>
                                <th className="border px-4 py-2">Remaning</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packActivities.map(payment => (
                                <tr key={payment.id}>
                                    <td className='border px-4 py-2'>{payment.description}</td>
                                    <td className='border px-4 py-2'>{payment.formatedDate}</td>
                                    <td className='border px-4 py-2'>{payment.operation === 'add' ? `+${payment.formattedOperation}` : `-${payment.formattedOperation}`}</td>
                                    <td className='border px-4 py-2'>{payment.formattedRemaining}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <ActivityTable activities={packActivities} packInfo={pack} />

                    <h2 className='text-2xl mt-10'>Payments history</h2>
                    <table className="table-auto mt-4 bg-white text-black rounded-md">
                        <thead>
                            <tr className='bg-color_Grey'>
                                <th className="border px-4 py-2">Date</th>
                                {/* <th className="border px-4 py-2">Reference</th> */}
                                <th className="border px-4 py-2">Amount</th>
                                <th className="border px-4 py-2">Method</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (

                                <tr key={payment?.id}>
                                    <td className='border px-4 py-2'>{new Date(payment?.date).toLocaleDateString()}</td>
                                    {/* <td className='border px-4 py-2'></td> */}
                                    <td className='border px-4 py-2'>{payment?.amount} {payment?.currency}</td>
                                    <td className='border px-4 py-2'>{payment?.method}</td>
                                    <td className='border px-4 py-2'>
                                        <button className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold rounded-full px-3 py-1 m-1" onClick={(event) => deletePaymentHandler(event, payment.id)}>🗑️ Delete payment</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>


                {parseFloat(pack.price) - parseFloat(pack.totalPayments) > 0 ? (
                    <div>
                        <h2 className='text-2xl mt-10'>Add pending payments</h2>
                        <div className='flex items-center justify-center bg-color_backgroundGrey'>

                            <form id='addPayment' onSubmit={handlePaymentSubmit} className='flex items-center pt-5 pb-5'>
                                <Field>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input className="border-2 rounded-lg" type="text" defaultValue={(parseFloat(pack.price) - parseFloat(pack.totalPayments)).toFixed(2)} id="amount" placeholder="0" required={true} />
                                </Field>
                                {/*  <Field>
                                    <Label htmlFor="reference">Reference</Label>
                                    <Input className="border-2 rounded-lg" type="text" id="reference" placeholder="Payment reference" required={false} />
                                </Field> */}
                                <Field>
                                    <Label htmlFor="paymentMethod">Select Payment Method</Label>
                                    <select id="paymentMethod" name="paymentMethod" className="border-2 rounded-lg w-full p-2" required>
                                        <option value="card">Card</option>
                                        <option value="cash">Cash</option>
                                        <option value="bankTransfer">Bank Transfer</option>
                                        <option value="paypal">Paypal</option>
                                        <option value="stripe">Stripe</option>
                                        <option value="others">Others</option>
                                    </select>
                                </Field>
                                <Button type='submit'>Save</Button>
                            </form>
                        </div>
                    </div>
                ) : (
                    null
                )}

            </div>
        </main>
    }
}