"use client"
import { login } from '@/app/Slices/AuthSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AfterLogin({ userId }) {
    const dispatch = useDispatch()
    if (userId) {
        dispatch(login())
    }
    return (
        <div>AfterLogin</div>
    )
}
