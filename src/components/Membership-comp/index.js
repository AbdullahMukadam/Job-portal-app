"use client"
import React, { useEffect, useState } from 'react'
import { PricingCard } from './membership-utils/pricing-card'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import { UpdateCandidateProfileDetails, UpdateRecruiterProfileDetails } from '@/app/actions/detailsActions'
import { useSearchParams } from 'next/navigation'




export default function MembershipComponent({ profileDetails }) {
    const ProfileRole = profileDetails?.role
    const { toast } = useToast()
    const pathName = useSearchParams()
    const [typeMembership, settypeMembership] = useState("")
    const path = pathName.get("status")
    console.log(profileDetails)

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

    const handleCancelMembership = async () => {
        try {
            const formData = {
                ...profileDetails,
                membershipType: "free",
                membershipstartDate: new Date().toISOString(),
                membershipendDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                isPremiumUser: false,
            }

            const UpdateProfile = await UpdateCandidateProfileDetails(formData, profileDetails._id, "/Membership")
            if (UpdateProfile.success) {
                toast({
                    title: "Success",
                    description: "Membership Removed Succesfully",
                });
            }

        } catch (error) {
            console.error("Cancel Membership Error:", error);
            toast({
                title: "Error",
                description: "Error in Cancelling Membership. Please try again.",
                variant: "destructive"
            });
        }
    }


    useEffect(() => {

        const handleUpdateUserProfile = async () => {

            if (path === "success") {
                
                const formData = {
                    ...profileDetails,
                    membershipType: typeMembership,
                    membershipstartDate: new Date().toISOString(),
                    membershipendDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
                    isPremiumUser: true,
                }
                const updateProfile = profileDetails?.role === "candidate" ? await UpdateCandidateProfileDetails(formData, profileDetails._id) : await UpdateRecruiterProfileDetails()

                if (!updateProfile.success) {
                    toast({
                        title: "Error",
                        description: "Unable to Update Profile. Please try again.",
                        variant: "destructive"
                    });
                    return
                }

                toast({
                    title: "Success",
                    description: "Payment Intiated Succesfully. You Are now a Premium User",
                })
            } else if (path === "cancel") {
                toast({
                    title: "Error",
                    description: "Payment failed. Please try again.",
                    variant: "destructive"
                });
            }
        }

        handleUpdateUserProfile()
    }, [path])


    return (
        <div className='w-full h-full'>
            <Button onClick={handleCancelMembership}>Cancel Membership</Button>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan} profileDetails={profileDetails} settypeMembership={settypeMembership} />
                    ))}
                </div>
            </div>
        </div>
    )
}

