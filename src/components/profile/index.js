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
    <div className="w-full h-full p-4 bg-gray-50">
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex items-center gap-x-4">
            <Avatar className="w-20 h-20 border-2 border-white">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${CandidateInfo.Name}`} alt={CandidateInfo.Name} />
              <AvatarFallback>{CandidateInfo.Name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-white">{CandidateInfo.Name}</CardTitle>
              <p className="text-sm text-gray-200">{CandidateInfo.Skills}</p>
              <Badge variant="secondary" className="mt-2 bg-white text-blue-600">{membershipType} member</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-700">
                <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                <span>{CandidateInfo.College}, {CandidateInfo.GraduatedYear}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                <span>{CandidateInfo.TotalExperience} years experience</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                <span>{CandidateInfo.PreferedJobLocation}</span>
              </div>
              <Button onClick={handleResumeView} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                View Resume
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              <div className="flex items-center text-gray-700">
                <Mail className="mr-2 h-5 w-5 text-blue-600" />
                <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
              </div>
              <div className="flex items-center text-gray-700">
                <Github className="mr-2 h-5 w-5 text-blue-600" />
                <a href={CandidateInfo.GithubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Profile</a>
              </div>
              <div className="flex items-center text-gray-700">
                <Linkedin className="mr-2 h-5 w-5 text-blue-600" />
                <a href={CandidateInfo.LinkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn Profile</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {CandidateInfo.Skills.split(',').map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">{skill.trim()}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-gray-100 flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-2 mb-4 md:mb-0">
            <Button
              onClick={handleSelectforJob}
              disabled={applicantStatus === "accepted"}
              className={`${applicantStatus === "accepted" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {applicantStatus === "accepted" ? "Accepted ✓" : "Accept"}
            </Button>
            <Button
              onClick={handleRejectforJob}
              disabled={applicantStatus === "rejected"}
              className="bg-red-600 hover:bg-red-700 text-black"
            >
              {applicantStatus === "rejected" ? "Rejected ✕" : "Reject"}
            </Button>
          </div>
          <div>
            {applicantStatus === "pending" && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                Application Pending
              </Badge>
            )}
            {applicantStatus === "accepted" && (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Application Accepted
              </Badge>
            )}
            {applicantStatus === "rejected" && (
              <Badge variant="outline" className="bg-red-100 text-red-800">
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