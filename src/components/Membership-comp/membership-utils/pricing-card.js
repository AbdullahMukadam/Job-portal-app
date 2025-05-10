"use client"
import React, { useEffect, useState } from 'react'
import { CheckIcon, XIcon } from './icons'
import { Button } from '@/components/ui/button'
import { CreatePriceIdAction, stripePaymentAction } from '@/app/actions/paymentActions'
import { useToast } from '@/hooks/use-toast'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { UpdateCandidateProfileDetails, UpdateRecruiterProfileDetails } from '@/app/actions/detailsActions'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing Stripe Publishable Key');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function PricingCard({ title, description, price, features, profileDetails, settypeMembership }) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()



    //console.log(profileDetails)

    const handlePayment = async () => {
        try {
            settypeMembership(title)
            setIsLoading(true);
            const stripe = await stripePromise;

            if (!stripe) {
                throw new Error('Could not initialize Stripe');
            }


            const session = await CreatePriceIdAction({
                ammount: price,
                membershipType: title
            }, title);
            console.log(session.typeMembership)


            if (!session.success) {
                throw new Error(session.message || 'Failed to create price');
            }


            const mainPayment = await stripePaymentAction({
                line_Items: [{
                    price: session.id,
                    quantity: 1
                }],
                email: profileDetails?.email,
                membershipType: title
            });

            if (!mainPayment.success) {
                throw new Error(mainPayment.message || 'Failed to create checkout session');
            }


            const { error } = await stripe.redirectToCheckout({
                sessionId: mainPayment.id
            });

            if (error) {
                throw new Error(error.message);
            }



        } catch (error) {
            console.error("Payment Error:", error);
            toast({
                title: "Error",
                description: error.message || "Payment failed. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="divide-y dark:bg-zinc-900 divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                    {title}
                    <span className="sr-only dark:text-white">Plan</span>
                </h2>
                <p className="mt-2 text-gray-700 dark:text-white">{description}</p>
                <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">₹{price}</strong>
                    <span className="text-sm font-medium text-gray-500 ">/month</span>
                </p>
                <Button
                    className={`mt-4 w-full ${profileDetails?.membershipType === title ? "bg-white border-2 border-blue-600 text-black" : ""}`}
                    onClick={handlePayment}
                    disabled={profileDetails?.membershipType === title}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        profileDetails?.membershipType === title ? "Purchased" : "Get Started"
                    )}
                </Button>
            </div>
            <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                <ul className="mt-2 space-y-2 sm:mt-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-1">
                            {feature.included ? <CheckIcon /> : <XIcon />}
                            <span className="text-gray-700 dark:text-white">{feature.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

