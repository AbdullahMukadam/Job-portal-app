"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Briefcase, MapPin, Mail, Github, Linkedin } from 'lucide-react'
import { Button } from '../ui/button'
import { createClient } from '@supabase/supabase-js'

export default function ProfileComponent({ ProfileInfo }) {
  const { CandidateInfo, email, membershipType } = ProfileInfo


  const SupabaseClient = createClient("https://pufnqviswcgxajjpucmr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zm5xdmlzd2NneGFqanB1Y21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNjczMDAsImV4cCI6MjA1MTc0MzMwMH0.h0hrZ33R2iz06Cg13NgHvmvUr8AexEeWeo_LBBNd8lk")


  const handleResumeView = async () => {
    const response = await SupabaseClient.storage.from("job-board-public").getPublicUrl(CandidateInfo.resume).data
    window.open(`${response.publicUrl}`)
  }

  const handleSelectforJob = ()=>{

  }

  const handleRejectforJob = ()=>{

  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${CandidateInfo.Name}`} alt={CandidateInfo.Name} />
            <AvatarFallback>{CandidateInfo.Name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{CandidateInfo.Name}</CardTitle>
            <p className="text-sm text-muted-foreground">{CandidateInfo.Skills}</p>
            <Badge variant="outline" className="mt-2">{membershipType} member</Badge>

          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              <span>{CandidateInfo.College}, {CandidateInfo.GraduatedYear}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              <span>{CandidateInfo.TotalExperience} years experience</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{CandidateInfo.PreferedJobLocation}</span>

            </div>
            <Button onClick={handleResumeView}>See Resume</Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
            </div>
            <div className="flex items-center">
              <Github className="mr-2 h-4 w-4" />
              <a href={CandidateInfo.GithubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Profile</a>
            </div>
            <div className="flex items-center">
              <Linkedin className="mr-2 h-4 w-4" />
              <a href={CandidateInfo.LinkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn Profile</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {CandidateInfo.Skills.split(',').map((skill, index) => (
                <Badge key={index} variant="secondary">{skill.trim()}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <div className='w-[30%] p-1 flex items-center gap-2'>
          <Button onClick={handleSelectforJob}>Select</Button>
          <Button variant="destructive" onClick={handleRejectforJob}>Reject</Button>
        </div>

      </CardFooter>
    </Card>
  )
}

