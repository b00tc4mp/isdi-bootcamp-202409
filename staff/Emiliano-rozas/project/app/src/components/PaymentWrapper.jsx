import React from 'react'
import PaymentForm from './PaymentForm'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function PaymentWrapper({ orderId }) {
    return (
        <Elements stripe={stripePromise}>
            {/* El provider siempre viene seteado por defecto */}
            <PaymentForm orderId={orderId} provider="stripe" />
        </Elements>
    )
}
