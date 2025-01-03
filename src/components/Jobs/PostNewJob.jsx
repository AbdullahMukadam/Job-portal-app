"use client"
import { DialogDemo } from '@/utils/Dialog/Dialog'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

function PostNewJob() {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className=''>
        <Button onClick={()=> setIsOpen(true)}>Post Job</Button>
        <DialogDemo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        />
    </div>
  )
}

export default PostNewJob