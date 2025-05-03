"use client"
import { login } from '@/app/Slices/AuthSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function AfterLogin({ userId }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (userId) {
            dispatch(login(userId))
        }
    }, [userId, dispatch])

    return (
        <div className='text-xl font-serif font-bold text-black'>Please Ignore This Dummy Data, And you can Start Exploring the App.</div>
    )
}
