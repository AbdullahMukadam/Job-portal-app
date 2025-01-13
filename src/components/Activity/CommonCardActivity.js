import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Briefcase, DollarSign, Clock } from 'lucide-react'

export default function CommonCardActivity() {
    return (
        <Card className="w-full max-w-2xl hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold">title</CardTitle>
                        <p className="text-lg text-muted-foreground">CompanyName</p>
                    </div>
                    <Badge variant="secondary">part-time</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        location
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        Posted 
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="mr-2 h-4 w-4" />
                         'Salary not specified'
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                         'Full-time'
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Job Description:</h4>
                    <p className="text-sm">description</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                        {/* {job.skills.split(',').map((skill, index) => (
                            <Badge key={index} variant="outline">{skill.trim()}</Badge>
                        ))} */}
                        skills
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Briefcase className="mr-2 h-4 w-4" />
                  applicant
                </div>
               
            </CardFooter>
        </Card>
    )
}
