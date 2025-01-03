import React from 'react'
import PostNewJob from './PostNewJob'

export default function JobsComponent({ profileDetails }) {
    return (
        <div className='w-full h-full p-2'>
            <div className='w-full h-full p-1 flex items-center justify-between'>
                <div className='w-[50%] p-1'>
                    <h1 className='text-3xl font-bold'>{profileDetails?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}</h1>
                </div>
                <div className='w-[50%] p-1 flex justify-end'>
                    {profileDetails?.role === "candidate" ? <p>Filter</p> : <PostNewJob />}
                </div>
            </div>
            <div className='w-full h-full p-1'>
                <h1>Jobs Listing</h1>
            </div>

        </div>
    )
}
