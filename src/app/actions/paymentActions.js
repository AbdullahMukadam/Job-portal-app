"use server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe Secret Key');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16", 
});

export async function CreatePriceIdAction(data, membershipType) {
    try {
       
        const product = await stripe.products.create({
            name: "Premium Plan",
            type: "service",
        });

        
        const session = await stripe.prices.create({
            currency: "inr",
            unit_amount: data.ammount * 100,
            recurring: {
                interval: "year"
            },
            product: product.id 
        });

        if (session) {
            return {
                success: true,
                id: session?.id,
                type : membershipType
            }
        }

    } catch (error) {
        console.error("Error in Creating PriceId", error)
        return {
            success: false,
            message: error.message || 'Error in Creating PriceId'
        }
    }
}

export async function stripePaymentAction(data) {
    try {
        const payment = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: data.line_Items,
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/Membership?status=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/Membership?status=cancel`,
            billing_address_collection: 'required',
            customer_email: data.email, 
        });

        if (payment) {
            return {
                success: true,
                id: payment.id
            }
        }
    } catch (error) {
        console.error("Error in Payment", error)
        return {
            success: false,
            message: error.message || 'Error in Payment'
        }
    }
}

