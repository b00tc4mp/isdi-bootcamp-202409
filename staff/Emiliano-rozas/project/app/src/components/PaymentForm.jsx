import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import logic from '../logic/index';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
console.log('Stripe Public Key:', import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ orderId, provider }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe is not loaded yet.');
            return;
        }

        if (!orderId) {
            setError('Order ID is missing.');
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Crear un PaymentMethod con los datos de la tarjeta
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (error) {
                setError(error.message);
                setProcessing(false);
                return;
            }

            const paymentMethodId = paymentMethod.id; // de aca sale el paymentMethodId

            // aca lo enviamos al backend junto con el orderId y provider
            const response = await logic.processPayment(orderId, paymentMethodId, provider);


            if (response.success) {
                setPaymentSuccess(true);
                console.log('Payment successful:', response);

                // Recuperar información del pago para confirmar su estado
                const paymentInfo = await logic.retrievePayment(response.paymentResult.id);
                setPaymentIntent(paymentInfo);


            } else {
                setError(response.message || 'Payment failed');
            }
        } catch (error) {
            setError('An unexpected error occurred.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
            <CardElement className="p-4 bg-white rounded-md" />
            <button
                type="submit"
                disabled={!stripe || processing}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
                {processing ? 'Processing...' : 'Pay'}
            </button>

            {error && <p className="mt-4 text-red-500">{error}</p>}
            {paymentSuccess && <p className="mt-4 text-green-500">Payment successful!</p>}

            {paymentIntent && (
                <div className="mt-4 p-2 bg-gray-700 text-white rounded-md">
                    <p><strong>Payment Intent ID:</strong> {paymentIntent.id}</p>
                    <p><strong>Status:</strong> {paymentIntent.status}</p>
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
