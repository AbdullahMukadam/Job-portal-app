"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { createJobAction } from "@/app/actions/jobsActions"
import { useSelector } from "react-redux"

export function DialogDemo({ profileDetails }) {
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      CompanyName: profileDetails?.RecruiterInfo?.companyName || "",
    }
  });

  const jobList = useSelector((state) => state.job.jobs)
  const [recruiterEligiblity, setrecruiterEligiblity] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    //console.log(jobList)
    if (!profileDetails?.isPremiumUser && profileDetails.membershipType === "free") {
      const checkAccess = jobList?.length >= 2
      if (checkAccess) {
        setrecruiterEligiblity(true)
        setTimeout(() => {
          toast({
            title: "Membership",
            description: "Please Upgrade to Premium Plan to Post More Jobs.",
            variant: "destructive",
          });
        }, 3000);
      }

    } else if (profileDetails?.membershipType === "Starter") {
      const checkAccess = jobList?.length >= 5
      if (checkAccess) {
        setrecruiterEligiblity(true)
        setTimeout(() => {
          toast({
            title: "Membership",
            description: "Please Upgrade to Premium Plan to Post More Jobs.",
            variant: "destructive",
          });
        }, 3000);
      }

    } else if (profileDetails?.membershipType === "Pro") {
      const checkAccess = jobList.length >= 10
      if (checkAccess) {
        setrecruiterEligiblity(true)
        setTimeout(() => {
          toast({
            title: "Membership",
            description: "Please Upgrade to Premium Plan to Post More Jobs.",
            variant: "destructive",
          });
        }, 3000);
      }

    }
  }, [profileDetails?.isPremiumUser, profileDetails?.membershipType, jobList])

  const submitHandler = async (data) => {
    try {
      if (!profileDetails?.userId) {
        toast({
          title: "Error",
          description: "Recruiter ID is required.",
          variant: "destructive",
        });
        return;
      }


      const formData = {
        CompanyName: data.CompanyName,
        type: data.type,
        title: data.title,
        location: data.location,
        description: data.description,
        skills: data.skills,
        recruiterId: profileDetails.userId,
      };

      const response = await createJobAction(formData, "/Jobs");

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        setIsOpen(false);
        reset();
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      console.error("Error in submitting Job:", error);
      toast({
        title: "Error",
        description: error.message || "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={recruiterEligiblity ? "destructive" : "outline"} disabled={recruiterEligiblity}>{recruiterEligiblity ? "Upgrade Membership" : "Add New Job Post"}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-screen-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Add New Job Post</DialogTitle>
            <DialogDescription className="text-center">
              Fill in the details for the new job posting.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid gap-4 py-4">
              {[
                { id: "CompanyName", label: "Company Name" },
                { id: "type", label: "Type" },
                { id: "title", label: "Title" },
                { id: "location", label: "Location" },
                { id: "description", label: "Description" },
                { id: "skills", label: "Skills" },
              ].map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-right">
                    {field.label}
                  </Label>
                  <div className="col-span-3">
                    {field.id === "CompanyName" ? (
                      <Input
                        id={field.id}
                        {...register(field.id, {
                          required: `${field.label} is required`,
                        })}
                        defaultValue={profileDetails?.RecruiterInfo?.companyName || ""}
                        disabled={!!profileDetails?.RecruiterInfo?.companyName}
                      />
                    ) : (
                      <Input
                        id={field.id}
                        {...register(field.id, {
                          required: `${field.label} is required`,
                        })}
                      />
                    )}
                    {errors[field.id] && (
                      <p className="text-sm text-red-500 mt-1">{errors[field.id].message}</p>
                    )}
                    {field.id === "CompanyName" && profileDetails?.RecruiterInfo?.companyName && (
                      <p className="text-sm text-red-500 mt-1">Company name cannot be changed.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submiting...
                  </span>
                ) : (
                  "Post Job"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  )
}

