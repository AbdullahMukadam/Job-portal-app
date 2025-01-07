

import { fetchUserDetails } from '@/app/actions/detailsActions'
import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'
import ReduxProvider from '@/Provider'
import { auth } from '@clerk/nextjs/server'
import React from 'react'


export default async function CommonLaout({ children }) {

    const {userId} = await auth()

    const userDetails = await fetchUserDetails(userId)
    
    return (

        <div className='mx-auto'>
            <ReduxProvider>
                <Header userDetails={userDetails} />

                <main>{children}</main>
                <Toaster />
            </ReduxProvider>


        </div>


    )
}
