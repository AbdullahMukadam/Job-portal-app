"use client"

import React from "react"


import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export function DrawerDemo({ drawerOpen, setDrawerOpen, job }) {


    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Applicants Information</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {job?.length > 0 ? (
                            job?.map((jobApplicants) => (
                                jobApplicants.applicants.map((applicant) => (
                                    <Card key={applicant.applicantData.userId}>
                                        <CardHeader>
                                            <CardTitle>{applicant.applicantData.details.Name}</CardTitle>
                                            <CardDescription>Applied Date: {new Date(applicant.applicantData.applicationDate).toLocaleDateString()}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="w-full p-1">
                                            <div className="w-full p-2 flex items-center justify-between">
                                                <h2 className="text-bold">{applicant.applicantData.email}</h2>
                                                <Button>View Profile</Button>
                                            </div>
                                        </CardContent>

                                    </Card>
                                ))
                            ))
                        ) : <p className="text-sm text-slate-800">No One Has To this Job</p>}

                    </div>
                    <DrawerFooter className={" flex items-center justify-center"}>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
