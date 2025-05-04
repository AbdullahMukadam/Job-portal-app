"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, MapPin, Mail, Github, Linkedin } from 'lucide-react'
import { Button } from '../ui/button'
import { createClient } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'
import { AlertDialogDemo } from '@/utils/Alert-Dialog/Alert-Dialog'

export default function ProfileComponent({ ProfileInfo }) {
  const { CandidateInfo, email, membershipType } = ProfileInfo
  const [jobList, setJobList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAppStatus, setselectedAppStatus] = useState("")
  const [applicantStatus, setApplicantStatus] = useState("")
  const jobs = useSelector((state) => state.job.jobs)
  const job = useSelector((state) => state.job.SingleJob)
  const SupabaseClient = createClient("https://pufnqviswcgxajjpucmr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zm5xdmlzd2NneGFqanB1Y21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjczMDAsImV4cCI6MjA1MTc0MzMwMH0.h0hrZ33R2iz06Cg13NgHvmvUr8AexEeWeo_LBBNd8lk")

  useEffect(() => {
    if (jobs) {
      setJobList(jobs)
    }
  }, [jobs])

  useEffect(() => {
    if (job && ProfileInfo?.userId) {
      const applicant = job.applicants?.find(
        (user) => user.applicantData.userId === ProfileInfo.userId
      )
      if (applicant) {
        setApplicantStatus(applicant.applicantData.status[0])
      } else {
        setApplicantStatus("pending")
      }
    }
  }, [job, ProfileInfo?.userId])

  const handleResumeView = async () => {
    const response = await SupabaseClient.storage.from("job-board-public").getPublicUrl(CandidateInfo.resume).data
    window.open(`${response.publicUrl}`)
  }

  const handleSelectforJob = () => {
    setIsOpen(true)
    setselectedAppStatus("Accepted")
  }

  const handleRejectforJob = () => {
    setIsOpen(true)
    setselectedAppStatus("Rejected")
  }

  return (
    <div className="w-full min-h-screen p-4 bg-white dark:bg-zinc-950">
      <Card className="w-full max-w-3xl mx-auto shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <CardHeader className="bg-black p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-2 border-white">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${CandidateInfo.Name}`} alt={CandidateInfo.Name} />
              <AvatarFallback className="bg-gray-800 text-white">
                {CandidateInfo.Name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold text-white">{CandidateInfo.Name}</CardTitle>
              <p className="text-gray-300 mt-1">{CandidateInfo.Skills}</p>
              <Badge className="mt-3 bg-gray-700 text-white hover:bg-gray-600">
                {membershipType} member
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-800 dark:text-white">
              <GraduationCap className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <span>{CandidateInfo.College}, {CandidateInfo.GraduatedYear}</span>
            </div>
            <div className="flex items-center text-gray-800 dark:text-white">
              <Briefcase className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <span>{CandidateInfo.TotalExperience} years experience</span>
            </div>
            <div className="flex items-center text-gray-800 dark:text-white">
              <MapPin className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <span>{CandidateInfo.PreferedJobLocation}</span>
            </div>
            <Button
              onClick={handleResumeView}
              variant="outline"
              className="border-gray-300 hover:bg-gray-800 text-gray-800 dark:text-white"
            >
              View Resume
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">Contact Information</h3>
            <div className="flex items-center text-gray-800 dark:text-white">
              <Mail className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </div>
            <div className="flex items-center text-gray-800 dark:text-white">
              <Github className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <a href={CandidateInfo.GithubProfile} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center text-gray-800 dark:text-white">
              <Linkedin className="mr-3 h-5 w-5 text-gray-600 dark:text-white" />
              <a href={CandidateInfo.LinkedInProfile} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {CandidateInfo.Skills.split(',').map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-gray-100 text-gray-800 border-gray-300"
                >
                  {skill.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-gray-50 dark:bg-black border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-3">
            <Button
              onClick={handleSelectforJob}
              disabled={applicantStatus === "accepted"}
              className={`min-w-[100px] ${applicantStatus === "accepted" ?
                "bg-gray-800 text-white hover:bg-gray-700" :
                "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"}`}
            >
              {applicantStatus === "accepted" ? "Selected" : "Select"}
            </Button>
            <Button
              onClick={handleRejectforJob}
              disabled={applicantStatus === "rejected"}
              className={`min-w-[100px] ${applicantStatus === "rejected" ?
                "bg-gray-800 text-white hover:bg-gray-700" :
                "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"}`}
            >
              {applicantStatus === "rejected" ? "Rejected" : "Reject"}
            </Button>
          </div>

          <div>
            {applicantStatus === "pending" && (
              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                Application Pending
              </Badge>
            )}
            {applicantStatus === "accepted" && (
              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                Application Accepted
              </Badge>
            )}
            {applicantStatus === "rejected" && (
              <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
                Application Rejected
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>

      <AlertDialogDemo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleRejectforJob={handleRejectforJob}
        handleSelectforJob={handleSelectforJob}
        jobList={jobList}
        ProfileInfo={ProfileInfo}
        selectedAppStatus={selectedAppStatus}
      />
    </div>
  )
}