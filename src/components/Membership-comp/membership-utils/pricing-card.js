"use client"
import React from 'react'
import { CheckIcon, XIcon } from './icons'
import { Button } from '@/components/ui/button'
import { CreatePriceIdAction, stripePaymentAction } from '@/app/actions/paymentActions'
import { useToast } from '@/hooks/use-toast'
import { loadStripe } from '@stripe/stripe-js'

export function PricingCard({ title, description, price, features, profileDetails }) {
    const stripePromise = loadStripe(String(process.env.STRIPE_PUBLISHABLE_KEY))


    const { toast } = useToast()
    const handlePayment = async () => {
        const stripe = await stripePromise
        try {
            const session = await CreatePriceIdAction({
                ammount: price
            })
            if (session.success) {
                const mainPayment = await stripePaymentAction({
                    line_Items: [
                        {
                            price: session?.id,
                            quantity: "1"
                        }
                    ]
                })
                if (mainPayment) {
                    const status = await stripe.redirectToCheckout({
                        sessionId: mainPayment?.id
                    })

                }
            }
        } catch (error) {
            console.log("Error In Payment", error)
            toast({
                title: "Error",
                description: "An Error occurred in Payment" || error.message,
                variant: "destructive"
            })
        }


    }
    return (
        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
            <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium text-gray-900">
                    {title}
                    <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 text-gray-700">{description}</p>
                <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">₹{price}</strong>
                    <span className="text-sm font-medium text-gray-700">/month</span>
                </p>
                <Button
                    className="mt-4 rounded border border-indigo-600 bg-indigo-600 px-12 py-1 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                    onClick={handlePayment}
                >
                    Get Started
                </Button>
            </div>
            <div className="p-6 sm:px-8">
                <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>
                <ul className="mt-2 space-y-2 sm:mt-4">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-1">
                            {feature.included ? <CheckIcon /> : <XIcon />}
                            <span className="text-gray-700">{feature.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

