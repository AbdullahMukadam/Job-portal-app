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

    return null
}
