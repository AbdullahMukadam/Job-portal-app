"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Briefcase, DollarSign, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { JobApplicantApply } from '@/app/actions/jobsActions'

export default function JobListingCandidate({ job, profileDetails }) {
    const { toast } = useToast()

    const [submittingStatus, setSubmittingStatus] = useState(false)
    const [appliedStatus, setAppliedStatus] = useState(false);

    function checkJobApply() {
        const currentUserId = profileDetails?.userId;
        
        const hasApplied = job?.applicants?.some(applicant => 
            applicant?.applicantData?.userId === currentUserId
        );
        
        setAppliedStatus(hasApplied);
    }

    useEffect(() => {
        checkJobApply();
    }, [job?.applicants, profileDetails?.userId]);



    // console.log(profileDetails)
    const handleJobApplicantApply = async (jobId) => {
        try {
            setSubmittingStatus(true)
            const ApplicantsData = {
                userId: profileDetails?.userId,
                email: profileDetails?.email,
                status: ["pending"],
                details: profileDetails?.CandidateInfo,
                applicationDate: new Date().toISOString(),
                JobId: jobId
            }
            const response = await JobApplicantApply(jobId, ApplicantsData, "/Jobs")
            if (response.success) {

                setSubmittingStatus(false)
                toast({
                    title: "Success",
                    description: 'Sucessfully Applied to Job'
                })
                console.log(response, "Sucessfully Applied to Job")
            }
        } catch (error) {
            console.error("Error in Appying to Job:", error);
            setSubmittingStatus(false)
            toast({
                title: "Error",
                description: error.message || "There was an error applying to job. Please try again.",
                variant: "destructive",
            });
        }
    }




    return (
        <Card className="w-full max-w-2xl hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                        <p className="text-lg text-muted-foreground">{job.CompanyName}</p>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4" />
                        {job.salary || 'Salary not specified'}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {job.type || 'Full-time'}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Job Description:</h4>
                    <p className="text-sm">{job.description}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.split(',').map((skill, index) => (
                            <Badge key={index} variant="outline">{skill.trim()}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {job.applicants.length} applicant(s)
                </div>
                <Button onClick={() => handleJobApplicantApply(job._id)} disabled={appliedStatus} >
                    {submittingStatus ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Applying...
                        </span>
                    ) : (
                        appliedStatus ? "Applied" : "Apply Now"
                    )}
                </Button>
            </CardFooter>
        </Card>



    )
}

