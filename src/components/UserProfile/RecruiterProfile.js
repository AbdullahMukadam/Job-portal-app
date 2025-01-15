"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RecruiterProfile() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const onSubmit = async (data) => {
        // Handle form submission here
        console.log(data)
        // You would typically send this data to your backend
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Recruiter Profile</CardTitle>
                <CardDescription>Please fill in your details</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                            id="name" 
                            {...register("name", { required: "Name is required" })}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                            id="companyName" 
                            {...register("companyName", { required: "Company name is required" })}
                            className={errors.companyName ? "border-red-500" : ""}
                        />
                        {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyRole">Your Role at Company</Label>
                        <Input 
                            id="companyRole" 
                            {...register("companyRole", { required: "Company role is required" })}
                            className={errors.companyRole ? "border-red-500" : ""}
                        />
                        {errors.companyRole && <p className="text-sm text-red-500">{errors.companyRole.message}</p>}
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

