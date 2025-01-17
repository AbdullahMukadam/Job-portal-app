import React from 'react'
import { PricingCard } from './membership-utils/pricing-card'




export default function MembershipComponent({ profileDetails }) {
    const ProfileRole = profileDetails?.role

    const pricingPlans = [
        {
            title: 'Starter',
            description: ProfileRole === "candidate" ? "For Basic Features" : "For Testing and Understanding the features.",
            price: 200,
            features: [
                { name: ProfileRole === "candidate" ? "5 Application" : "5 Job Post", included: true },
                { name: 'Email support', included: true },
                { name: 'Help center access', included: false },
                { name: 'Phone support', included: false },
                { name: 'Community access', included: false },
            ],
        },
        {
            title: 'Pro',
            description: ProfileRole === "candidate" ? "Access Limited Advanced Features" : "Limited Advanced Features",
            price: 1000,
            features: [
                { name: ProfileRole === "candidate" ? "10 Application" : "10 Job Post", included: true },
                { name: 'Email support', included: true },
                { name: 'Help center access', included: true },
                { name: 'Phone support', included: false },
                { name: 'Community access', included: false },
            ],
        },
        {
            title: 'Enterprise',
            description: ProfileRole === "candidate" ? "Access All Advanced Features" : "Specially for Recruiters",
            price: 5000,
            features: [
                { name: ProfileRole === "candidate" ? "Unlimited Applications" : "Unlimited Job Post", included: true },
                { name: 'Email support', included: true },
                { name: 'Help center access', included: true },
                { name: 'Phone support', included: true },
                { name: 'Community access', included: true },
            ],
        },
    ]

    return (
        <div className='w-full h-full'>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan} profileDetails={profileDetails} />
                    ))}
                </div>
            </div>
        </div>
    )
}

