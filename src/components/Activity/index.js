'use client'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs"
import CommonCardActivity from './CommonCardActivity'

export default function ActivityComponent() {
    const jobs = useSelector((state) => state.job.jobs)
    const currentUserId = useSelector((state) => state.auth.userId)
    const [userApplications, setUserApplications] = useState([])

    useEffect(() => {
        if (jobs && currentUserId) {
            const userApps = jobs.flatMap(job => {
                return job.applicants
                    .filter(applicant => applicant.applicantData.userId === currentUserId)
                    .map(applicant => ({
                        ...applicant,
                        jobId: job._id,
                        jobTitle: job.title,
                        companyName: job.CompanyName,
                        jobDescription: job.description,
                        jobLocation: job.location,
                        jobType: job.type,
                        jobSkills : job.skills
                    }))
            })
            setUserApplications(userApps)
        }
    }, [jobs, currentUserId])

    const renderContent = (status) => {
        const filteredApplications = userApplications.filter(app => app.applicantData.status[0] === status)

        if (!filteredApplications.length) {
            return (
                <div className="flex items-center justify-center h-40">
                    <p className="text-lg text-gray-500">No {status} applications found</p>
                </div>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((app) => (
                    <CommonCardActivity key={`${app.JobId}-${app.applicantData.userId}`} application={app} />
                ))}
            </div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="pending" className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <h1 className="text-3xl font-bold tracking-tight">Your Activity</h1>
                    <TabsList className="grid w-full sm:w-auto grid-cols-3 gap-2">
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="accepted">Accepted</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="pending" className="space-y-4">
                    <h2 className="text-xl font-semibold">Pending Applications</h2>
                    {renderContent("pending")}
                </TabsContent>
                <TabsContent value="accepted" className="space-y-4">
                    <h2 className="text-xl font-semibold">Accepted Applications</h2>
                    {renderContent("accepted")}
                </TabsContent>
                <TabsContent value="rejected" className="space-y-4">
                    <h2 className="text-xl font-semibold">Rejected Applications</h2>
                    {renderContent("rejected")}
                </TabsContent>
            </Tabs>
        </div>
    )
}

