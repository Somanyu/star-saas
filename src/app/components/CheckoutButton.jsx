"use client"

import { SITE_URL } from "@/utils";
import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutButton = ({ planId }) => {

    const [loading, setLoading] = useState(false);

    async function onCheckout(plan) {
        try {
            setLoading(true); // Set loading to true when request is sent
            const response = await fetch(`${SITE_URL}/api/checkout/${plan}`);
            const data = await response.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            await stripe.redirectToCheckout({ sessionId: data?.id });
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error as needed
        } finally {
            setLoading(false); // Set loading to false when request is completed (success or failure)
        }
    }

    return (
        <div>
            <Button
                isLoading={loading}
                isDisabled={loading}
                onClick={() => onCheckout(planId)}
                className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                aria-describedby="tier-standard"
            >
                {loading ? 'Loading...' : 'Get started'}
            </Button>
        </div>
    )
}

export default CheckoutButton