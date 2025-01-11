'use client'
import { fetchUserDetails } from "@/app/actions/detailsActions"
import { JobApplicationRejectedAction, JobApplicationSelectedAction, SendEmailToCandidate } from "@/app/actions/jobsActions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function AlertDialogDemo({ isOpen, setIsOpen, handleSelectforJob, handleRejectforJob, jobList, ProfileInfo, selectedAppStatus }) {
    const job = useSelector((state) => state.job.SingleJob)
    const userId = useSelector((state) => state.auth.userId)
    const { toast } = useToast()
    const [loading, setloading] = useState(false)
    const [recruiterDetails, setrecruiterDetails] = useState(null)

    useEffect(() => {

        const fetchDetails = async () => {
            const details = await fetchUserDetails(userId)
            if (details) {
                setrecruiterDetails(details)

            }
        }

        fetchDetails()

    }, [userId])

    //console.log(job)
    const handleCandidateJobStatus = async () => {
        try {
            setloading(true);
            const userId = ProfileInfo.userId;
            const jobId = job._id;

            let response;
            if (selectedAppStatus === "Accepted") {
                response = await JobApplicationSelectedAction(jobId, userId);
            } else if (selectedAppStatus === "Rejected") {
                response = await JobApplicationRejectedAction(jobId, userId);
            }

            if (response?.success) {
                // Send email notification
                const emailResponse = await SendEmailToCandidate(
                    recruiterDetails.email,
                    ProfileInfo.email, // Use candidate's email
                    selectedAppStatus,
                    job.title
                );

                if (!emailResponse.success) {
                    console.warn('Email notification failed:', emailResponse.message);
                }

                setIsOpen(false);
                setloading(false);
                toast({
                    title: "Success",
                    description: `Application ${selectedAppStatus.toLowerCase()} successfully${emailResponse.success ? ' and notification sent' : ''}`
                });
            } else {
                throw new Error(response?.message || 'Failed to update application status');
            }

        } catch (error) {
            console.error('Error in handleCandidateJobStatus:', error);
            setloading(false);
            toast({
                title: "Error",
                description: error.message || "Failed to process the application",
                variant: "destructive"
            });
        }
    };
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <Button onClick={handleCandidateJobStatus}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submiting...
                            </span>
                        ) : (
                            "Continue"
                        )}
                    </Button>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
