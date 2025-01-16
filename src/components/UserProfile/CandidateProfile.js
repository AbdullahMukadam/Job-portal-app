"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import { UpdateCandidateProfileDetails } from '@/app/actions/detailsActions'

export default function CandidateProfile({ profileDetails }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: profileDetails.CandidateInfo.Name,
            email: profileDetails.email,
            currentJobLocation: profileDetails.CandidateInfo.CurrentJobLocation,
            preferredJobLocation: profileDetails.CandidateInfo.PreferedJobLocation,
            currentSalary: profileDetails.CandidateInfo.CurrentSalary,
            noticePeriod: profileDetails.CandidateInfo.NoticePeriod,
            skills: profileDetails.CandidateInfo.Skills,
            currentCompany: profileDetails.CandidateInfo.CurrentCompany,
            previousCompany: profileDetails.CandidateInfo.PreviousCompany,
            totalExperience: Number(profileDetails.CandidateInfo.TotalExperience),
            college: profileDetails.CandidateInfo.College,
            graduationYear: Number(profileDetails.CandidateInfo.GraduatedYear),
            linkedInProfile: profileDetails.CandidateInfo.LinkedInProfile,
            githubProfile: profileDetails.CandidateInfo.GithubProfile
        }
    })
    const { toast } = useToast()
    //console.log(profileDetails)

    const onSubmit = async (data) => {
        console.log(data)
        try {

            const formData = {
                userId: profileDetails.userId,
                email: data.email,
                role: profileDetails.role,
                membershipType: profileDetails.membershipType,
                membershipstartDate: profileDetails.membershipstartDate ,
                membershipendDate: profileDetails.membershipendDate ,
                isPremiumUser: profileDetails.isPremiumUser ,
                CandidateInfo: {
                    resume: profileDetails.CandidateInfo.resume,
                    Name: data.name,
                    CurrentJobLocation: data.currentJobLocation,
                    PreferedJobLocation: data.preferredJobLocation,
                    CurrentSalary: data.currentSalary,
                    NoticePeriod: data.noticePeriod,
                    Skills: data.skills,
                    CurrentCompany: data.currentCompany,
                    PreviousCompany: data.previousCompany,
                    TotalExperience: Number(data.totalExperience),
                    College: data.college,
                    GraduatedYear: Number(data.graduationYear),
                    LinkedInProfile: data.linkedInProfile,
                    GithubProfile: data.githubProfile
                }
            }

            const response = await UpdateCandidateProfileDetails(formData, profileDetails._id, "/user-profile")
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Profile Details Updated Succesfully" || response.message,
                })
            }

        } catch (error) {
            console.log("Error In Updating Profile", error)
            toast({
                title: "Error",
                description: "Error In Updating Profile" || error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Candidate Profile</CardTitle>
                <CardDescription>Please fill in your details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currentJobLocation">Current Job Location</Label>
                        <Input
                            id="currentJobLocation"
                            {...register("currentJobLocation", { required: "Current job location is required" })}
                            className={errors.currentJobLocation ? "border-red-500" : ""}
                        />
                        {errors.currentJobLocation && <p className="text-sm text-red-500">{errors.currentJobLocation.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="preferredJobLocation">Preferred Job Location</Label>
                        <Input
                            id="preferredJobLocation"
                            {...register("preferredJobLocation", { required: "Preferred job location is required" })}
                            className={errors.preferredJobLocation ? "border-red-500" : ""}
                        />
                        {errors.preferredJobLocation && <p className="text-sm text-red-500">{errors.preferredJobLocation.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currentSalary">Current Salary</Label>
                        <Input
                            id="currentSalary"

                            {...register("currentSalary", { required: "Current salary is required" })}
                            className={errors.currentSalary ? "border-red-500" : ""}
                        />
                        {errors.currentSalary && <p className="text-sm text-red-500">{errors.currentSalary.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="noticePeriod">Notice Period</Label>
                        <Input
                            id="noticePeriod"
                            {...register("noticePeriod", { required: "Notice period is required" })}
                            className={errors.noticePeriod ? "border-red-500" : ""}
                        />
                        {errors.noticePeriod && <p className="text-sm text-red-500">{errors.noticePeriod.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Input
                            id="skills"
                            {...register("skills", { required: "Skills are required" })}
                            className={errors.skills ? "border-red-500" : ""}
                        />
                        {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currentCompany">Current Company</Label>
                        <Input
                            id="currentCompany"
                            {...register("currentCompany", { required: "Current company is required" })}
                            className={errors.currentCompany ? "border-red-500" : ""}
                        />
                        {errors.currentCompany && <p className="text-sm text-red-500">{errors.currentCompany.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="previousCompany">Previous Company</Label>
                        <Input
                            id="previousCompany"
                            {...register("previousCompany")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="totalExperience">Total Experience (years)</Label>
                        <Input
                            id="totalExperience"
                            type="number"
                            {...register("totalExperience", { required: "Total experience is required" })}
                            className={errors.totalExperience ? "border-red-500" : ""}
                        />
                        {errors.totalExperience && <p className="text-sm text-red-500">{errors.totalExperience.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="college">College</Label>
                        <Input
                            id="college"
                            {...register("college", { required: "College is required" })}
                            className={errors.college ? "border-red-500" : ""}
                        />
                        {errors.college && <p className="text-sm text-red-500">{errors.college.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input
                            id="graduationYear"
                            type="number"
                            {...register("graduationYear", { required: "Graduation year is required" })}
                            className={errors.graduationYear ? "border-red-500" : ""}
                        />
                        {errors.graduationYear && <p className="text-sm text-red-500">{errors.graduationYear.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
                        <Input
                            id="linkedInProfile"
                            {...register("linkedInProfile")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="githubProfile">GitHub Profile</Label>
                        <Input
                            id="githubProfile"
                            {...register("githubProfile")}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Save Profile"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

