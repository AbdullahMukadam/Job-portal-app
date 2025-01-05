import JobsComponent from '@/components/Jobs'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { fetchUserDetails } from '../actions/detailsActions'

export default async function JobsPage() {

    const { userId } = await auth()

    const profileDetails = await fetchUserDetails(userId)
    //console.log(userId)

    return (
        <div className='w-full h-full p-2'>
            <JobsComponent profileDetails={profileDetails}/>
        </div>
    )
}
