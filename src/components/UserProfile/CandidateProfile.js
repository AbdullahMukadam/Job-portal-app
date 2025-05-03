"use client"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UpdateCandidateProfileDetails } from "@/app/actions/detailsActions"
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Code,
    Building2,
    GraduationCap,
    Calendar,
    Linkedin,
    Github,
    Mail,
    User,
    Loader2,
} from "lucide-react"

export default function CandidateProfile({ profileDetails }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: profileDetails.CandidateInfo.Name,
            email: profileDetails.email,
            currentJobLocation: profileDetails.CandidateInfo.CurrentJobLocation,
            preferredJobLocation: profileDetails.CandidateInfo.PreferedJobLocation,
            currentSalary: profileDetails.CandidateInfo.CurrentSalary,
            noticePeriod: profileDetails.CandidateInfo.NoticePeriod,
            skills: profileDetails.CandidateInfo.Skills,
            currentCompany: profileDetails.CandidateInfo.CurrentCompany,
            previousCompany: profileDetails.CandidateInfo.PreviousCompany,
            totalExperience: Number(profileDetails.CandidateInfo.TotalExperience),
            college: profileDetails.CandidateInfo.College,
            graduationYear: Number(profileDetails.CandidateInfo.GraduatedYear),
            linkedInProfile: profileDetails.CandidateInfo.LinkedInProfile,
            githubProfile: profileDetails.CandidateInfo.GithubProfile,
        },
    })
    const { toast } = useToast()

    const onSubmit = async (data) => {
        try {
            const formData = {
                userId: profileDetails.userId,
                email: data.email,
                role: profileDetails.role,
                membershipType: profileDetails.membershipType,
                membershipstartDate: profileDetails.membershipstartDate,
                membershipendDate: profileDetails.membershipendDate,
                isPremiumUser: profileDetails.isPremiumUser,
                CandidateInfo: {
                    resume: profileDetails.CandidateInfo.resume,
                    Name: data.name,
                    CurrentJobLocation: data.currentJobLocation,
                    PreferedJobLocation: data.preferredJobLocation,
                    CurrentSalary: data.currentSalary,
                    NoticePeriod: data.noticePeriod,
                    Skills: data.skills,
                    CurrentCompany: data.currentCompany,
                    PreviousCompany: data.previousCompany,
                    TotalExperience: Number(data.totalExperience),
                    College: data.college,
                    GraduatedYear: Number(data.graduationYear),
                    LinkedInProfile: data.linkedInProfile,
                    GithubProfile: data.githubProfile,
                },
            }

            const response = await UpdateCandidateProfileDetails(formData, profileDetails._id, "/user-profile")
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Profile Details Updated Successfully" || response.message,
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Error In Updating Profile" || error.message,
                variant: "destructive",
            })
        }
    }

    const InputField = ({ icon: Icon, label, id, type = "text", required = true, ...props }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4" />
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                {...register(id, { required: required ? `${label} is required` : false })}
                className={`h-10 px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent ${errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                {...props}
            />
            {errors[id] && <p className="text-sm text-red-500 mt-1">{errors[id].message}</p>}
        </div>
    )

    return (
        <Card className="w-full max-w-3xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
            <CardHeader className="space-y-1 border-b pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">Candidate Profile</CardTitle>
                <CardDescription className="text-gray-500">Share your professional journey with us</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <CardContent className="grid gap-8 pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={User} label="Name" id="name" />
                        <InputField icon={Mail} label="Email" id="email" type="email" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={MapPin} label="Current Job Location" id="currentJobLocation" />
                        <InputField icon={MapPin} label="Preferred Job Location" id="preferredJobLocation" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={DollarSign} label="Current Salary" id="currentSalary" />
                        <InputField icon={Clock} label="Notice Period" id="noticePeriod" />
                    </div>

                    <InputField icon={Code} label="Skills" id="skills" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={Building2} label="Current Company" id="currentCompany" />
                        <InputField icon={Building2} label="Previous Company" id="previousCompany" required={false} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={Briefcase} label="Total Experience (years)" id="totalExperience" type="number" />
                        <InputField icon={Calendar} label="Graduation Year" id="graduationYear" type="number" />
                    </div>

                    <InputField icon={GraduationCap} label="College" id="college" />

                    <div className="grid gap-6 md:grid-cols-2">
                        <InputField icon={Linkedin} label="LinkedIn Profile" id="linkedInProfile" required={false} />
                        <InputField icon={Github} label="GitHub Profile" id="githubProfile" required={false} />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end border-t pt-6 pb-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-colors"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Updating...</span>
                            </div>
                        ) : (
                            "Save Profile"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
