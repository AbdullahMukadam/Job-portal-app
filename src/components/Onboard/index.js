import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export default function OnBoardComponent() {

    return (
        <div className='w-full h-full p-2'>
            <Tabs defaultValue='candidate'>
                <div className='w-full p-1 flex items-center justify-between'>
                    <h1 className='font-semibold text-sm md:text-xl md:font-bold md:w-full'>Welcome to onBoard Page, Please Fill the details</h1>
                    <TabsList className="w-[50%]">
                        <TabsTrigger value="candidate">Candidate</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                    </TabsList>
                </div>
                <div className='w-full p-2'>
                    <TabsContent value="candidate">
                        <Card>

                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                            <div className="space-y-1">
                                    <Label htmlFor="Resume">Resume</Label>
                                    <Input id="Resume" defaultValue="" type="file"/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current Job location</Label>
                                    <Input id="current" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="prefered">Prefered Job location</Label>
                                    <Input id="prefered" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="salary">Current Salary</Label>
                                    <Input id="salary" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Notice">Notice Period</Label>
                                    <Input id="Notice" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Skills">Skills</Label>
                                    <Input id="Skills" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Company">Current Company</Label>
                                    <Input id="Company" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Previous">Previous Company</Label>
                                    <Input id="Previous" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Experience">Total Experience </Label>
                                    <Input id="Experience" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="college">college </Label>
                                    <Input id="college" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Graduated">Graduated Year </Label>
                                    <Input id="Graduated" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="LinkedIn">LinkedIn Profile</Label>
                                    <Input id="LinkedIn" defaultValue="" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="Github">Github Profile</Label>
                                    <Input id="Github" defaultValue="" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="recruiter">
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription>
                                    Enter Your Details here
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Your Name</Label>
                                    <Input id="current" type="text" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">Your Company Name</Label>
                                    <Input id="new" type="text" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="next">Your Role at Your Company</Label>
                                    <Input id="next" type="text" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Details</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
