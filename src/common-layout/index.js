

import Header from '@/components/Header'
import ReduxProvider from '@/Provider'
import React from 'react'


export default function CommonLaout({ children }) {
    return (

        <div className='mx-auto'>
            <ReduxProvider>
                <Header />

                <main>{children}</main>
            </ReduxProvider>


        </div>


    )
}
