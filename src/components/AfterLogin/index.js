"use client"
import { login } from '@/app/Slices/AuthSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardContent, CardTitle } from '../ui/card'
import { BriefcaseBusiness } from 'lucide-react'
import { ChartComponent } from '@/utils/Charts/chart'
import { TableComponent } from '@/utils/Table/table'

export default function AfterLogin({ userId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(login(userId))
        }
    }, [userId, dispatch])

    return (
        <div className='text-xl font-sans text-black dark:text-white'>
            <div className='w-full'>
                <h1 className='font-sans font-bold mb-3'>DashBoard</h1>
                <div className='w-full flex flex-col gap-2 lg:flex-row'>
                    <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">Applied Jobs</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl'>34 <span className='font-bold'>Jobs</span></p>

                        </CardContent>
                    </Card>
                    <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">Applied Jobs</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl'>34 <span className='font-bold'>Jobs</span></p>

                        </CardContent>
                    </Card>
                    <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">Applied Jobs</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl'>34 <span className='font-bold'>Jobs</span></p>

                        </CardContent>
                    </Card>
                </div>
                <div className='w-full lg:flex items-center justify-center gap-2'>
                    <Card className='w-full mt-2 lg:w-[50%] p-2'>
                        <CardTitle className="pl-2">Overview</CardTitle>
                        <ChartComponent />
                    </Card>
                    <Card className='w-full mt-2 lg:w-[45%] p-2'>
                        <CardTitle className="pl-2">History</CardTitle>
                        <TableComponent />
                    </Card>
                </div>

            </div>
        </div>
    )
}
