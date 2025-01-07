import JobsComponent from '@/components/Jobs'
import React, { Suspense } from 'react'
import { auth } from '@clerk/nextjs/server'
import { fetchUserDetails } from '../actions/detailsActions'
import { fetchJobPostForCandidate, fetchJobPostForRecruiter } from '../actions/jobsActions'
import SkeletonLoader from '@/utils/Job-list-skeleton/SkeletonLoader'

export default async function JobsPage() {
    const { userId } = await auth()

    return (
        <div className='w-full h-full p-2'>
            <Suspense fallback={<SkeletonLoader />}>
                <JobsContent userId={userId} />
            </Suspense>
        </div>
    )
}

async function JobsContent({ userId }) {
    const profileDetails = await fetchUserDetails(userId)
    const recruiterJobs = profileDetails?.role === "candidate" 
        ? await fetchJobPostForCandidate() 
        : await fetchJobPostForRecruiter(userId)

    // Serialize the profileDetails
    const serializedProfileDetails = profileDetails ? JSON.parse(JSON.stringify(profileDetails)) : null

    return (
        <JobsComponent
            profileDetails={serializedProfileDetails}
            recruiterJobs={recruiterJobs}
        />
    )
}