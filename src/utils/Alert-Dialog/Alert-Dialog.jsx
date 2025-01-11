'use client'
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

export function AlertDialogDemo({ isOpen, setIsOpen, handleSelectforJob, handleRejectforJob, jobList, ProfileInfo, selectedAppStatus }) {
    console.log(ProfileInfo)
    console.log(jobList)
    const handleCandidateJobStatus =async () => {
       // const userId = ProfileInfo.userId
        //const jobId = jobList.filter(()=> )
    }
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

                    <Button onClick={handleCandidateJobStatus}>Continue</Button>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
