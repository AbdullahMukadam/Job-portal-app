import MembershipComponent from '@/components/Membership-comp'
import React from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'
import { fetchUserDetails } from '../actions/detailsActions'
import { redirect } from 'next/navigation'

export default async function MembershipPage() {
  const { userId } = await auth()

  const profileDetails = await fetchUserDetails(userId)
  return (
    <div className='w-full h-full font-poppins'>
      <MembershipComponent profileDetails={profileDetails} />
    </div>
  )
}
