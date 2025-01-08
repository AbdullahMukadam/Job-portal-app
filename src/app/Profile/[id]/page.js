import { fetchUserDetails } from '@/app/actions/detailsActions'
import ProfileComponent from '@/components/profile'
import React from 'react'

export default async function ProfilePage({ params }) {
    const {id} = await params
    const ProfileInfo = await fetchUserDetails(id)
    return (
        <div>
            <ProfileComponent ProfileInfo={ProfileInfo} />
        </div>
    )
}
