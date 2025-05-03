"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Briefcase, DollarSign, Clock, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { JobApplicantApply } from "@/app/actions/jobsActions"

export default function JobListingCandidate({
    job,
    profileDetails,
    UserAppliedJobs,
    eligiblityStatus,
    seteligiblityStatus,
}) {
    const { toast } = useToast()

    const [submittingStatus, setSubmittingStatus] = useState(false)
    const [appliedStatus, setAppliedStatus] = useState(false)

    console.log(UserAppliedJobs)

    function checkJobApply() {
        const currentUserId = profileDetails?.userId

        const hasApplied = job?.applicants?.some((applicant) => applicant?.applicantData?.userId === currentUserId)

        setAppliedStatus(hasApplied)
    }

    useEffect(() => {
        checkJobApply()
    }, [job?.applicants, profileDetails?.userId])

    useEffect(() => {
        if (!profileDetails?.isPremiumUser && profileDetails.membershipType === "free") {
            const checkAccess = UserAppliedJobs.length >= 1
            if (checkAccess) {
                seteligiblityStatus(true)
            }
        } else if (profileDetails?.membershipType === "Starter") {
            const checkAccess = UserAppliedJobs.length >= 5
            if (checkAccess) {
                seteligiblityStatus(true)
            }
        } else if (profileDetails?.membershipType === "Pro") {
            const checkAccess = UserAppliedJobs.length >= 10
            if (checkAccess) {
                seteligiblityStatus(true)
            }
        }
    }, [profileDetails?.membershipType, profileDetails?.isPremiumUser, appliedStatus])

    const handleJobApplicantApply = async (jobId) => {
        try {
            setSubmittingStatus(true)
            const ApplicantsData = {
                userId: profileDetails?.userId,
                email: profileDetails?.email,
                status: ["pending"],
                details: profileDetails?.CandidateInfo,
                applicationDate: new Date().toISOString(),
                JobId: jobId,
            }
            const response = await JobApplicantApply(jobId, ApplicantsData, "/Jobs")
            if (response.success) {
                setSubmittingStatus(false)
                toast({
                    title: "Success",
                    description: "Sucessfully Applied to Job",
                })
                console.log(response, "Sucessfully Applied to Job")
            }
        } catch (error) {
            console.error("Error in Appying to Job:", error)
            setSubmittingStatus(false)
            toast({
                title: "Error",
                description: error.message || "There was an error applying to job. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Card className="w-full max-w-2xl border border-gray-200 hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">{job.title}</CardTitle>
                        <p className="text-lg text-gray-600 mt-1">{job.CompanyName}</p>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300 font-medium px-3 py-1">
                        {job.type}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                        {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                        {job.salary || "Salary not specified"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        {job.type || "Full-time"}
                    </div>
                </div>
                <div className="pt-1">
                    <h4 className="font-semibold mb-2 text-gray-900">Job Description:</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
                </div>
                <div className="pt-1">
                    <h4 className="font-semibold mb-2 text-gray-900">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.split(",").map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50 text-gray-800 border-gray-300">
                                {skill.trim()}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-2 pb-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                    {job.applicants.length} applicant(s)
                </div>
                <Button
                    onClick={() => handleJobApplicantApply(job._id)}
                    disabled={appliedStatus || eligiblityStatus}
                    className={`px-4 py-2 ${appliedStatus ? "bg-gray-200 text-gray-700 hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
                        } focus:ring-2 focus:ring-gray-300 transition-colors`}
                >
                    {submittingStatus ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            Applying...
                        </span>
                    ) : appliedStatus ? (
                        "Applied"
                    ) : (
                        "Apply Now"
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
