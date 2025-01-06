import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Briefcase, Trash2 } from 'lucide-react'

export default function JobListing({ job }) {
  return (
    <Card className="w-full max-w-2xl">
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
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Briefcase className="mr-1 h-4 w-4" />
            {job.applicants.length} applicant(s)
          </div>
        </div>
        <p className="text-sm">{job.description}</p>
        <div>
          <h4 className="font-semibold mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.split(',').map((skill, index) => (
              <Badge key={index} variant="outline">{skill.trim()}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className=" flex justify-between items-center">
        <Button variant="outline">Save Job</Button>
        <div className="space-x-2 flex items-center">
          <Button variant="destructive" >
            <Trash2 className="mr-2 h-3 w-3" />
            Delete
          </Button>
          <Button>Apply Now</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

