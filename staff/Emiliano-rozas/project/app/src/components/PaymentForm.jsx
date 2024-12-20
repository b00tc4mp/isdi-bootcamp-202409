import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { ClipLoader } from 'react-spinners' // Librería para el spinner
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import logic from '../logic/index'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ orderId, provider }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentIntent, setPaymentIntent] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            setError('Stripe is not loaded yet.') // Validación por si Stripe no está listo
            return
        }

        const userId = logic.getUserId()
        if (!userId) {
            setError('User is not logged in.')
            return
        }

        if (!orderId) {
            setError('Order ID is missing.')
            return
        }

        setProcessing(true)
        setError(null)

        try {
            // De acá sale el paymentMethod, lo crea Stripe, nosotros no hacemos nada
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement), // Obtiene la tarjeta ingresada por el usuario
            })

            if (error) {
                setError(error.message)
                setProcessing(false)
                return
            }

            const paymentMethodId = paymentMethod.id
            // Acá mandamos la info a la lógica de processPayment
            const { paymentResult } = await logic.processPayment(orderId, paymentMethodId, provider)

            if (paymentResult.status === 'succeeded') {

                setPaymentSuccess(true)

                // Guardamos los detalles del pago para mostrarlos al usuario
                setPaymentIntent(paymentResult)
            } else {
                setError('Payment failed')
                setPaymentSuccess(false)
            }
        } catch (error) {
            console.error(error.message)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-xl text-white font-semibold mb-4 text-center">Complete Your Payment</h2>
            <div className="p-2 bg-gray-100 rounded-md">
                <CardElement className="bg-white p-4 rounded-md border" />
            </div>
            <button
                type="submit"
                disabled={!stripe || processing}
                className={`mt-4 w-full py-2 rounded-md text-white font-semibold ${processing ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                {processing ? (
                    <div className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" /> {/* Spinner de carga */}
                        <span>Processing...</span>
                    </div>
                ) : (
                    'Pay'
                )}
            </button>

            {/* Mensajes de error */}
            {error && (
                <p className="mt-4 text-red-600 font-medium text-center bg-red-100 p-2 rounded-md">
                    {error}
                </p>
            )}

            {/* Mensaje de éxito */}
            {paymentSuccess && (
                <div className="mt-6 p-4 bg-green-100 rounded-md">
                    <h3 className="text-green-600 font-bold text-lg text-center">Payment Successful!</h3>
                    <p className="text-gray-700 mt-2 text-sm text-center">
                        Thank you for your purchase. Below are your payment details:
                    </p>
                </div>
            )}

            {/* Detalles del pago */}
            {paymentIntent && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-lg">
                    <h3 className="text-gray-800 font-semibold mb-2 text-center">Payment Details</h3>
                    <p className="text-gray-700"><strong>Payment ID:</strong> {paymentIntent.id}</p>
                    <p className="text-gray-700"><strong>Status:</strong> {paymentIntent.status}</p>
                    <p className="text-gray-700"><strong>Amount:</strong> {paymentIntent.amount / 100} {paymentIntent.currency.toUpperCase()}</p>
                </div>
            )}
        </form>
    )
}

// Wrapper que contiene todo, acá pasamos por parámetro el orderId que capturamos de placeOrder y ejecuta toda la lógica del pago
const PaymentWrapper = ({ orderId }) => (
    <Elements stripe={stripePromise}>
        {/* El provider siempre viene seteado por defecto */}
        <PaymentForm orderId={orderId} provider="stripe" />
    </Elements>
)

export default PaymentWrapper