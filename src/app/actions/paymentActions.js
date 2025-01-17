"use server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function CreatePriceIdAction(data) {
    try {
        const session = await stripe.prices.create({
            currency: "inr",
            unit_amount: data.ammount,
            recurring: {
                interval: "year"
            },
            product_data: {
                name: "Premium Plan"
            }
        })

        if (session) {
            return {
                success: true,
                id: session?.id
            }
        }



    } catch (error) {
        console.log("Error in Creating PriceId", error)
        return {
            success: false,
            message: 'Error in Creating PriceId'
        }
    }
}

export async function stripePaymentAction(data) {
    try {

        const payment = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: data.line_Items,
            mode: "subscription",
            success_url: "http://localhost:3000/Membership" + "?status=success",
            cancel_url: "http://localhost:3000/Membership" + "?status=cancel"
        })
        if (payment) {
            return {
                success: true,
                id: payment.id
            }
        }
    } catch (error) {
        console.log("Error in Payment", error)
        return {
            success: false,
            message: 'Error in Payment'
        }
    }
}

