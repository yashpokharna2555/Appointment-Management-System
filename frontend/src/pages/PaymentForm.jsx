import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentForm = ({ appointment, backendUrl, token, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not ready. Please try again.');
      return;
    }

    try {
      // Step 1: Create payment intent
      const { data } = await axios.post(
        `${backendUrl}/api/user/create-payment-intent`,
        { 
            amount: appointment.amount * 100, // Use the amount from the schema
            currency: 'usd',
            appointmentId: appointment._id // Pass the appointment ID
        },
        { headers: { token } }
    );

      if (data.success) {
        const clientSecret = data.clientSecret;

        // Step 2: Confirm card payment
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: appointment.userData.name,
            },
          },
        });

        if (result.error) {
          toast.error(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
          toast.success('Payment Successful!');
          onSuccess();
        }
      } else {
        toast.error('Failed to create payment intent.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error processing payment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border border-gray-300 rounded p-2" />
      <button
        type="submit"
        disabled={!stripe}
        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
      >
        Pay ${appointment.docData.fees}
      </button>
    </form>
  );
};

export default PaymentForm;
