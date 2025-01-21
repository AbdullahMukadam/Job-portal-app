"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { UpdateRecruiterProfileDetails } from '@/app/actions/detailsActions'
import { User, Mail, Building2, Briefcase } from 'lucide-react'

export default function RecruiterProfile({ profileDetails }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: profileDetails.RecruiterInfo.name,
            companyName: profileDetails.RecruiterInfo.companyName,
            companyRole: profileDetails.RecruiterInfo.companyRole,
            email: profileDetails.email
        }
    })

    const { toast } = useToast()

    const onSubmit = async (data) => {
        try {
            const formData = {
                userId: profileDetails.userId,
                email: data.email,
                role: profileDetails.role,
                membershipType: profileDetails.membershipType,
                membershipstartDate: profileDetails.membershipstartDate,
                membershipendDate: profileDetails.membershipendDate,
                isPremiumUser: profileDetails.isPremiumUser,
                RecruiterInfo: {
                    name: data.name,
                    companyName: data.companyName,
                    companyRole: data.companyRole
                }
            }

            const response = await UpdateRecruiterProfileDetails(formData, profileDetails._id, "/user-profile")
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Profile Details Updated Successfully" || response.message,
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error In Updating Profile" || error.message,
                variant: "destructive"
            })
        }
    }

    const InputField = ({ icon: Icon, label, id, ...props }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4" />
                {label}
            </Label>
            <Input
                id={id}
                {...register(id, { required: `${label} is required` })}
                className={`h-10 px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
        </div>
    )

    return (
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
            <CardHeader className="space-y-1 border-b pb-7">
                <CardTitle className="text-2xl font-bold text-gray-900">Recruiter Profile</CardTitle>
                <CardDescription className="text-gray-500">Complete your profile to start connecting with candidates</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CardContent className="grid gap-6 pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={User} label="Your Name" id="name" />
                        <InputField icon={Mail} label="Your Email" id="email" type="email" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={Building2} label="Company Name" id="companyName" />
                        <InputField icon={Briefcase} label="Your Role at Company" id="companyRole" />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Updating...
                            </div>
                        ) : (
                            "Save Profile"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}