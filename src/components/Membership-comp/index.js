"use client"
import React, { useEffect, useState } from 'react'
import { PricingCard } from './membership-utils/pricing-card'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import { UpdateCandidateProfileDetails, UpdateRecruiterProfileDetails } from '@/app/actions/detailsActions'
import { useSearchParams } from 'next/navigation'
import { UpgradeBanner } from '../ui/upgrade-banner'




export default function MembershipComponent({ profileDetails }) {
    const ProfileRole = profileDetails?.role
    const { toast } = useToast()
    const pathName = useSearchParams()
    const [typeMembership, settypeMembership] = useState("")
    const path = pathName.get("status")
    const membershipTypeFromURL = pathName.get("membershipType")
    //console.log(profileDetails)
    const [visible, setvisible] = useState(false)

    const pricingPlans = [
        {
            title: 'Starter',
            description: ProfileRole === "candidate" ? "For Basic Features" : "For Testing the features.",
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

    useEffect(() => {
        setvisible(true)
    }, [])

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
                    membershipType: membershipTypeFromURL,
                    membershipstartDate: new Date().toISOString(),
                    membershipendDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
                    isPremiumUser: true,
                }
                const updateProfile = profileDetails?.role === "candidate" ? await UpdateCandidateProfileDetails(formData, profileDetails._id, "/Membership") : await UpdateRecruiterProfileDetails(formData, profileDetails._id, "/Membership")

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
    }, [path, membershipTypeFromURL])


    return (
        <div className='w-full min-h-screen bg-gray-50 py-8'>
            {visible && <UpgradeBanner
                buttonText='Important Note :'
                description="Payments are in Test Mode, Please Dont Enter Your Real CARD Details."
                onClose={() => setvisible(false)}
            />}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header Section */}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>Choose Your Plan</h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        {ProfileRole === "candidate"
                            ? "Select the perfect plan to boost your job search"
                            : "Choose the ideal plan for your recruitment needs"
                        }
                    </p>
                </div>

                {/* Membership Control */}
                {profileDetails?.isPremiumUser && (
                    <div className='max-w-3xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h2 className='text-lg font-semibold text-gray-900'>Current Plan: {profileDetails.membershipType}</h2>
                                <p className='text-sm text-gray-600'>Your premium membership is active</p>
                            </div>
                            <Button
                                onClick={handleCancelMembership}
                                variant="outline"
                                className='border-red-500 text-red-500 hover:bg-red-50'
                            >
                                Cancel Membership
                            </Button>
                        </div>
                    </div>
                )}

                {/* Pricing Cards Grid */}
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 mt-8'>
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className='transform transition-all duration-300 hover:scale-105'>
                            <PricingCard {...plan} profileDetails={profileDetails} settypeMembership={settypeMembership} />
                        </div>
                    ))}
                </div>


                <div className='mt-16 text-center'>
                    <p className='text-sm text-gray-600'>
                        All plans include access to our basic features. Upgrade anytime to unlock more capabilities.
                    </p>
                </div>
            </div>
        </div>
    )
}

