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
import { toast } from '@/hooks/use-toast'
import { submitRecruiterDetails } from '@/app/actions/detailsActions'
import { useSelector } from 'react-redux'
import { useUser } from '@clerk/nextjs'

export default function OnBoardComponent() {
    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()
    const [errorss, setErrors] = useState("")
    const userId = useSelector((state) => state.auth.userId)
    const { user } = useUser()



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
            reset()

        } catch (error) {
            toast({
                title: "Error",
                description: "An Error ocured in sending details"
            })
            setErrors("Error in sending details")

        }
    }

    const CandidateSubmit = () => {

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
                    <form onSubmit={handleSubmit(CandidateSubmit)}>
                        <TabsContent value="candidate">
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
                                        <Input id="Resume" defaultValue="" type="file" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current Job location</Label>
                                        <Input id="current" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="prefered">Prefered Job location</Label>
                                        <Input id="prefered" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="salary">Current Salary</Label>
                                        <Input id="salary" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Notice">Notice Period</Label>
                                        <Input id="Notice" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Skills">Skills</Label>
                                        <Input id="Skills" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Company">Current Company</Label>
                                        <Input id="Company" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Previous">Previous Company</Label>
                                        <Input id="Previous" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Experience">Total Experience </Label>
                                        <Input id="Experience" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="college">college </Label>
                                        <Input id="college" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Graduated">Graduated Year </Label>
                                        <Input id="Graduated" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="LinkedIn">LinkedIn Profile</Label>
                                        <Input id="LinkedIn" defaultValue="" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="Github">Github Profile</Label>
                                        <Input id="Github" defaultValue="" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit">Save changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </form>
                    <form onSubmit={handleSubmit(RecruiterDetails)}>
                        <TabsContent value="recruiter">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Details</CardTitle>
                                    <CardDescription>
                                        Enter Your Details here
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Your Name</Label>
                                        <Input id="current" type="text"
                                            {...register("name", {
                                                required: "Name is Required"
                                            })}
                                            className={errors.name ? "border-red-500" : ""}

                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">Your Company Name</Label>
                                        <Input id="new" type="text"
                                            {...register("companyName", {
                                                required: "Company Name is Required"
                                            })}
                                            className={errors.companyName ? "border-red-500" : ""}
                                        />
                                        {errors.companyName && (
                                            <p className="text-sm text-red-500">{errors.companyName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="next">Your Role at Your Company</Label>
                                        <Input id="next" type="text"
                                            {...register("companyRole", {
                                                required: "Company Role is Required"
                                            })}
                                            className={errors.companyRole ? "border-red-500" : ""}
                                        />
                                        {errors.companyRole && (
                                            <p className="text-sm text-red-500">{errors.companyRole.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
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
                        </TabsContent>
                    </form>

                </div>
            </Tabs>
        </div>
    )
}
