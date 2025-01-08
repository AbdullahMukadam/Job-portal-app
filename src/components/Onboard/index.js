"use client"
import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { submitCandidateDetails, submitRecruiterDetails } from '@/app/actions/detailsActions'
import { useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs'
import { Toaster } from '../ui/toaster'
import { createClient } from '@supabase/supabase-js'

export default function OnBoardComponent() {
    const { register: registerCandidate, handleSubmit: handleSubmitCandidate, reset: resetCandidate, formState: { isSubmitting: isSubmittingCandidate, errors: errorsCandidate } } = useForm()
    const { register: registerRecruiter, handleSubmit: handleSubmitRecruiter, reset: resetRecruiter, formState: { isSubmitting: isSubmittingRecruiter, errors: errorsRecruiter } } = useForm()
    const [errorss, setErrors] = useState("")
    const userId = useSelector((state) => state.auth.userId)
    const { user } = useUser()
    const { toast } = useToast()
    const SupabaseClient = createClient("https://pufnqviswcgxajjpucmr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zm5xdmlzd2NneGFqanB1Y21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjczMDAsImV4cCI6MjA1MTc0MzMwMH0.h0hrZ33R2iz06Cg13NgHvmvUr8AexEeWeo_LBBNd8lk")


    const RecruiterDetails = async (data) => {
        try {
            setErrors("")

            const formData = {
                userId,
                email: user?.primaryEmailAddress?.emailAddress,
                role: "recruiter",
                RecruiterInfo: {
                    name: data.name,
                    companyName: data.companyName,
                    companyRole: data.companyRole
                }
            }

            await submitRecruiterDetails(formData, "/onBoard")
            resetRecruiter()
            toast({
                title: "Added Details",
                description: "Details Added Successfully"
            })

        } catch (error) {
            toast({
                title: "Error",
                description: "An Error occurred in sending details"
            })
            setErrors("Error in sending details")
        }
    }

    const UploadFileToSupabase = async (file) => {
        const { data, error } = await SupabaseClient.storage.from("job-board-public").upload(`/public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false
        })
        if (error) {
            console.log("Error in File Uploading", error)
        } else {
            return data.path
        }
    }

    const DeleteFileFromSupabase = async (file) => {
        try {
            await SupabaseClient.storage.from("job-board-public").remove(`/public/${file.name}`)
        } catch (error) {
            console.log("Error in Deleting File", error)
        }

    }

    const CandidateSubmit = async (data) => {
        try {
            setErrors("")
            //console.log(data.resume[0])
            const filePath = await UploadFileToSupabase(data.resume[0])
            if (filePath) {
                console.log(filePath)
                const formData = {
                    userId,
                    email: user?.primaryEmailAddress?.emailAddress,
                    role: "candidate",
                    CandidateInfo: {
                        resume: filePath,
                        Name: data.Name,
                        CurrentJobLocation: data.CurrentJobLocation,
                        PreferedJobLocation: data.PreferedJobLocation,
                        CurrentSalary: data.CurrentSalary,
                        NoticePeriod: data.NoticePeriod,
                        Skills: data.Skills,
                        CurrentCompany: data.CurrentCompany,
                        PreviousCompany: data.PreviousCompany,
                        TotalExperience: Number(data.TotalExperience),
                        College: data.College,
                        GraduatedYear: Number(data.GraduatedYear),
                        LinkedInProfile: data.LinkedInProfile,
                        GithubProfile: data.GithubProfile
                    }
                }

                await submitCandidateDetails(formData, "/onBoard")

                resetCandidate()
                toast({
                    title: "Added Details",
                    description: "Candidate Details Added Successfully"
                })
            } else {
                toast({
                    title: "Error",
                    description: "Resume Haven't uploaded Yet, please try again"
                })
            }

        } catch (error) {
            await DeleteFileFromSupabase(data.resume[0])
            toast({
                title: "Error",
                description: "An Error occurred in sending details"
            })
            setErrors("Error in sending details")
        }
    }

    return (
        <div className='w-full h-full p-2'>
            <Tabs defaultValue='candidate'>
                <div className='w-full p-1 flex items-center justify-between'>
                    <h1 className='font-semibold text-sm md:text-xl md:font-bold md:w-full'>Welcome to onBoard Page, Please Fill the details</h1>
                    <TabsList className="w-[50%]">
                        <TabsTrigger value="candidate">Candidate</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                    </TabsList>
                </div>
                <div className='w-full p-2'>
                    <TabsContent value="candidate">
                        <form onSubmit={handleSubmitCandidate(CandidateSubmit)}>
                            <Card>

                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                    <CardDescription>
                                        Make changes to your account here. Click save when you're done.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="Resume">Resume</Label>
                                        <Input id="Resume" type="file" accept="application/pdf"
                                            {...registerCandidate("resume", {
                                                required: "Resume Is Required"
                                            })}
                                            className={errorsCandidate.resume ? "border-red-500" : ""}
                                        />
                                        {errorsCandidate.resume && (
                                            <p className="text-sm text-red-500">{errorsCandidate.resume.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="Name"
                                            {...registerCandidate("Name", {
                                                required: "Name Is Required"
                                            })}
                                            className={errorsCandidate.Name ? "border-red-500" : ""} />
                                        {errorsCandidate.Name && (
                                            <p className="text-sm text-red-500">{errorsCandidate.Name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current Job location</Label>
                                        <Input id="current"
                                            {...registerCandidate("CurrentJobLocation", {
                                                required: "Location Is Required"
                                            })}
                                            className={registerCandidate.CurrentJobLocation ? "border-red-500" : ""}

                                        />
                                        {registerCandidate.CurrentJobLocation && (
                                            <p className="text-sm text-red-500">{registerCandidate.CurrentJobLocation.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="prefered">Prefered Job location</Label>
                                        <Input id="prefered"
                                            {...registerCandidate("PreferedJobLocation", {
                                                required: "Location Is Required"
                                            })}
                                            className={registerCandidate.PreferedJobLocation ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.PreferedJobLocation && (
                                            <p className="text-sm text-red-500">{registerCandidate.PreferedJobLocation.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="salary">Current Salary</Label>
                                        <Input id="salary"
                                            {...registerCandidate("CurrentSalary", {
                                                required: "Current Salary Is Required"
                                            })}
                                            className={registerCandidate.CurrentSalary ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.CurrentSalary && (
                                            <p className="text-sm text-red-500">{registerCandidate.CurrentSalary.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Notice">Notice Period</Label>
                                        <Input id="Notice"
                                            {...registerCandidate("NoticePeriod", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.NoticePeriod ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.NoticePeriod && (
                                            <p className="text-sm text-red-500">{registerCandidate.NoticePeriod.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Skills">Skills</Label>
                                        <Input id="Skills"
                                            {...registerCandidate("Skills", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.Skills ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.Skills && (
                                            <p className="text-sm text-red-500">{registerCandidate.Skills.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Company">Current Company</Label>
                                        <Input id="Company"
                                            {...registerCandidate("CurrentCompany", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.CurrentCompany ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.CurrentCompany && (
                                            <p className="text-sm text-red-500">{registerCandidate.CurrentCompany.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Previous">Previous Company</Label>
                                        <Input id="Previous"
                                            {...registerCandidate("PreviousCompany", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.PreviousCompany ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.PreviousCompany && (
                                            <p className="text-sm text-red-500">{registerCandidate.PreviousCompany.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Experience">Total Experience </Label>
                                        <Input id="Experience"
                                            {...registerCandidate("TotalExperience", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.TotalExperience ? "border-red-500" : ""}
                                            type="number"
                                        />
                                        {registerCandidate.TotalExperience && (
                                            <p className="text-sm text-red-500">{registerCandidate.TotalExperience.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="college">college </Label>
                                        <Input id="college"
                                            {...registerCandidate("College", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.College ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.College && (
                                            <p className="text-sm text-red-500">{registerCandidate.College.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Graduated">Graduated Year </Label>
                                        <Input id="Graduated"
                                            {...registerCandidate("GraduatedYear", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.GraduatedYear ? "border-red-500" : ""}
                                            type="number"
                                        />
                                        {registerCandidate.GraduatedYear && (
                                            <p className="text-sm text-red-500">{registerCandidate.GraduatedYear.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="LinkedIn">LinkedIn Profile</Label>
                                        <Input id="LinkedIn"
                                            {...registerCandidate("LinkedInProfile", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.LinkedInProfile ? "border-red-500" : ""}

                                        />
                                        {registerCandidate.LinkedInProfile && (
                                            <p className="text-sm text-red-500">{registerCandidate.LinkedInProfile.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Github">Github Profile</Label>
                                        <Input id="Github"
                                            {...registerCandidate("GithubProfile", {
                                                required: "Please Enter the Information"
                                            })}
                                            className={registerCandidate.GithubProfile ? "border-red-500" : ""}
                                        />
                                        {registerCandidate.GithubProfile && (
                                            <p className="text-sm text-red-500">{registerCandidate.GithubProfile.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={isSubmittingCandidate}>
                                        {isSubmittingCandidate ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submiting...
                                            </span>
                                        ) : (
                                            "Submit Details"
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>

                        </form>
                    </TabsContent>
                    <TabsContent value="recruiter">
                        <form onSubmit={handleSubmitRecruiter(RecruiterDetails)}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recruiter Details</CardTitle>
                                    <CardDescription>
                                        Enter Your Details here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Your Name</Label>
                                        <Input id="current" type="text"
                                            {...registerRecruiter("name", {
                                                required: "Name is Required"
                                            })}
                                            className={errorsRecruiter.name ? "border-red-500" : ""}
                                        />
                                        {errorsRecruiter.name && (
                                            <p className="text-sm text-red-500">{errorsRecruiter.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">Your Company Name</Label>
                                        <Input id="new" type="text"
                                            {...registerRecruiter("companyName", {
                                                required: "Company Name is Required"
                                            })}
                                            className={errorsRecruiter.companyName ? "border-red-500" : ""}
                                        />
                                        {errorsRecruiter.companyName && (
                                            <p className="text-sm text-red-500">{errorsRecruiter.companyName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="next">Your Role at Your Company</Label>
                                        <Input id="next" type="text"
                                            {...registerRecruiter("companyRole", {
                                                required: "Company Role is Required"
                                            })}
                                            className={errorsRecruiter.companyRole ? "border-red-500" : ""}
                                        />
                                        {errorsRecruiter.companyRole && (
                                            <p className="text-sm text-red-500">{errorsRecruiter.companyRole.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" disabled={isSubmittingRecruiter}>
                                        {isSubmittingRecruiter ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Submit Details"
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </TabsContent>

                </div>
            </Tabs >
            <Toaster />
        </div >
    )
}
