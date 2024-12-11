import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import logic from '../logic/index';

import { errors } from 'com';

const { SystemError } = errors;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ orderId, provider }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        try {
            if (!stripe || !elements) throw new Error('Stripe is not loaded yet.');

            if (!orderId) throw new Error('Order ID is missing.');

            // aca se crea el PaymentMethod con los datos de la tarjeta
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) throw new SystemError(error.message);

            //lo guardamos to guapo para el evento
            const paymentMethodId = paymentMethod.id;

            // aca lo enviamos al backend junto con el orderId y provider bien acompañado
            const response = await logic.processPayment(orderId, paymentMethodId, provider);

            if (!response.success) throw new SystemError(response.message || 'Payment failed.');

            // Recuperamos información del pago para confirmar su estado
            const paymentInfo = await logic.retrievePayment(response.paymentResult.id);

            setPaymentIntent(paymentInfo);

            setPaymentSuccess(true);
        } catch (error) {
            console.error('Payment error:', error.message);
            setError(error.message || 'An unexpected error occurred.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
            <CardElement className="p-4 bg-white rounded-md" />
            <button
                type="submit"
                disabled={!stripe || processing} // se desactiva para que no se pueda tocar nada mientras se esta ejecutando y carga para el usuario
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
                {processing ? 'Processing...' : 'Pay'}
            </button>
            {/* //componente que maneja la visualización de mensajes de error */}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {paymentSuccess && <p className="mt-4 text-green-500">Payment successful!</p>}
            {paymentIntent && (
                <div className="mt-4 p-2 bg-gray-700 text-white rounded-md">
                    <h3 className="font-bold text-lg">Payment Details</h3>
                    <p><strong>Payment Intent ID:</strong> {paymentIntent.id}</p>
                    <p><strong>Status:</strong> {paymentIntent.status}</p>
                    <p><strong>Amount:</strong> {paymentIntent.amount / 100} {paymentIntent.currency.toUpperCase()}</p>
                </div>
            )}
        </form>
    );
};

const PaymentWrapper = ({ orderId }) => (
    <Elements stripe={stripePromise}>
        <PaymentForm orderId={orderId} provider="stripe" />
    </Elements>
);

export default PaymentWrapper;
