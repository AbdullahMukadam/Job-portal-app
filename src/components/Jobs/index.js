"use client"
import React, { useState } from 'react'
import PostNewJob from './PostNewJob'
import JobListing from './Joblisting'
import JobListingCandidate from './JobListingCandidate'
import { DrawerDemo } from '@/utils/Drawer/Drawer'


export default function JobsComponent({ profileDetails, recruiterJobs }) {
    const jobList = recruiterJobs?.jobs || []
    //console.log(profileDetails)
    const [drawerOpen, setDrawerOpen] = useState(false)



    return (
        <div className='w-full h-full p-4'>
            <div className='w-full mb-6 flex items-center justify-between'>
                <h1 className='text-3xl font-bold'>
                    {profileDetails?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}
                </h1>
                <div>
                    {profileDetails?.role === "candidate" ? (
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Filter Jobs
                        </button>
                    ) : (
                        <PostNewJob profileDetails={profileDetails} />
                    )}
                </div>
            </div>

            <div className="container mx-auto">
                {jobList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobList.map((jobItem) => (
                            profileDetails?.role === "candidate" ? (
                                <JobListingCandidate
                                    key={jobItem._id}
                                    profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                    job={jobItem}

                                />
                            ) : (
                                <JobListing
                                    key={jobItem._id}
                                    profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                    job={jobItem}
                                    setDrawerOpen={setDrawerOpen}
                                    drawerOpen={drawerOpen}
                                />
                            )
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">No jobs found.</p>
                )}
            </div>
            <DrawerDemo setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} job={jobList} />
        </div>
    )
}

