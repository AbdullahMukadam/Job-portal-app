"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CommonCardActivity from './CommonCardActivity'

export default function ActivityComponent() {
    const jobs = useSelector((state) => state.job.jobs)
    const CurrentuserId = useSelector((state) => state.auth.userId)
    const [userAppliedJobs, setuserAppliedJobs] = useState([])

    useEffect(() => {
        if (jobs) {
            const FilteredJobs = jobs.filter((job) => job.applicants.some((applicant) => applicant.applicantData.userId === CurrentuserId))
            setuserAppliedJobs(FilteredJobs)
            //console.log(userAppliedJobs)
        }
    }, [jobs, CurrentuserId])

    useEffect(() => {
        console.log("Updated userAppliedJobs:", userAppliedJobs);
    }, [userAppliedJobs]);
    return (
        <div className='w-full h-full p-2'>
            <Tabs defaultValue='pending'>
                <div className='w-full p-1 flex items-center justify-between'>
                    <h1 className='text-2xl font-bold md:text-4xl'>Your Activity</h1>
                    <div className='w-[50%] p-1'>

                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                            <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        </TabsList>


                    </div>
                    
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <TabsContent value="pending">
                            <CommonCardActivity />
                        </TabsContent>
                        <TabsContent value="accepted">
                            <CommonCardActivity />
                        </TabsContent>
                        <TabsContent value="rejected">
                            <CommonCardActivity />
                        </TabsContent>
                    </div>
            </Tabs>
        </div>
    )
}
