"use client"
import { DialogDemo } from '@/utils/Dialog/Dialog'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"


function PostNewJob({profileDetails}) {

  return (

    <DialogDemo profileDetails={profileDetails} />

  )
}

export default PostNewJob