import React from 'react'
import OnBoardComponent from '@/components/Onboard'
import { currentUser } from '@clerk/nextjs/server'
import { fetchUserDetails } from '../actions/detailsActions';
import { redirect } from 'next/navigation';

export default async function onBoard() {

  const user = await currentUser();

  const getProfileDetails = await fetchUserDetails(user.id)
  if (getProfileDetails?._id) {
    if (getProfileDetails?.role === "recruiter" && !getProfileDetails?.isPremiumUser) redirect("/Membership")
    else redirect("/")
  } else {
    return (
      <div className='w-full h-full p-2'>
        <OnBoardComponent />
      </div>
    )
  }


}
