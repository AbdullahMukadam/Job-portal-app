"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UpdateRecruiterProfileDetails } from "@/app/actions/detailsActions"
import { User, Mail, Building2, Briefcase, Loader2, CheckCircle } from "lucide-react"

export default function RecruiterProfile({ profileDetails }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            name: profileDetails.RecruiterInfo.name,
            companyName: profileDetails.RecruiterInfo.companyName,
            companyRole: profileDetails.RecruiterInfo.companyRole,
            email: profileDetails.email,
        },
    })

    const { toast } = useToast()
    const [isSaved, setIsSaved] = React.useState(false)

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
                    companyRole: data.companyRole,
                },
            }

            const response = await UpdateRecruiterProfileDetails(formData, profileDetails._id, "/user-profile")
            if (response.success) {
                setIsSaved(true)
                setTimeout(() => setIsSaved(false), 3000)

                toast({
                    title: "Profile Updated",
                    description: "Your profile has been successfully updated",
                })
            }
        } catch (error) {
            toast({
                title: "Update Failed",
                description: error.message || "There was a problem updating your profile",
                variant: "destructive",
            })
        }
    }

    const InputField = ({ icon: Icon, label, id, ...props }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="w-4 h-4" />
                {label}
            </Label>
            <Input
                id={id}
                {...register(id, { required: `${label} is required` })}
                className={`h-11 px-4 py-2 bg-white dark:bg-zinc-900 border rounded-lg transition-all focus:ring-2 focus:ring-black focus:border-transparent ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {errors[id] && <p className="text-sm text-red-500 mt-1 ml-1">{errors[id].message}</p>}
        </div>
    )

    return (
        <Card className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 shadow-xl rounded-xl border border-gray-200">
            <CardHeader className="space-y-2 border-b pb-6">
                <div className="flex items-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Recruiter Profile</CardTitle>
                    {isSaved && (
                        <div className="ml-auto flex items-center text-sm text-gray-700 gap-1.5 dark:text-white">
                            <CheckCircle className="w-4 h-4 text-black dark:text-white" />
                            <span>Changes saved</span>
                        </div>
                    )}
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-300">
                    Complete your profile to enhance your recruiting experience
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CardContent className="grid gap-8 pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={User} label="Your Name" id="name" placeholder="John Doe" />
                        <InputField icon={Mail} label="Your Email" id="email" type="email" placeholder="john@company.com" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={Building2} label="Company Name" id="companyName" placeholder="Acme Inc." />
                        <InputField
                            icon={Briefcase}
                            label="Your Role at Company"
                            id="companyRole"
                            placeholder="Talent Acquisition Manager"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t pt-6 pb-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        className={`px-8 py-2.5 rounded-lg transition-all ${isDirty
                                ? "bg-black text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Updating...</span>
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
