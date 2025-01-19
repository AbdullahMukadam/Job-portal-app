"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostNewJob from './PostNewJob'
import JobListing from './Joblisting'
import JobListingCandidate from './JobListingCandidate'
import { DrawerDemo } from '@/utils/Drawer/Drawer'
import { AllJobList, RemoveJobList } from '@/app/Slices/JobSlice'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from '../ui/checkbox'
import Image from 'next/image'

const FilterButton = ({ companyname, setcompanyname, location, setLocation, handleFilteration }) => {
    const [jobTypes, setJobTypes] = useState({
        "Full-Time": false,
        "Part-Time": false,
        Contract: false,
        Internship: false,
    });

    const handleTypeChange = (type) => {
        setJobTypes(prev => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleApplyFilters = () => {
        handleFilteration(jobTypes);
    };

    return (
        <Menubar className="border rounded-md">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="outline">Filter</Button>
                </MenubarTrigger>
                <MenubarContent className="w-80">
                    <div className="grid gap-4 p-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                placeholder="Enter company name"
                                value={companyname}
                                onChange={(e) => setcompanyname(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Job Type</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(jobTypes).map((type) => (
                                    <label key={type} htmlFor={type} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={type}
                                            checked={jobTypes[type]}
                                            onCheckedChange={() => handleTypeChange(type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <MenubarSeparator />
                        <MenubarItem asChild>
                            <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                        </MenubarItem>
                    </div>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

const JobsComponent = ({ profileDetails, recruiterJobs }) => {
    const jobList = recruiterJobs?.jobs || [];
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [jobDetailsForDrawer, setjobDetailsForDrawer] = useState([]);
    const [companyname, setcompanyname] = useState("");
    const [location, setLocation] = useState("");
    const [filterJobs, setfilterJobs] = useState(jobList);
    const [isLoading, setIsLoading] = useState(true);
    const currentUserId = useSelector((state) => state.auth.userId)
    const [UserAppliedJobs, setUserAppliedJobs] = useState([])
    const [eligiblityStatus, seteligiblityStatus] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (jobList) {
            dispatch(AllJobList(jobList));
            setfilterJobs(jobList);
        } else {
            dispatch(RemoveJobList());
            setfilterJobs([]);
        }
        setIsLoading(false);
    }, [jobList, dispatch]);

    useEffect(() => {

        const UserAppliedJobs = jobList.flatMap((job) => {
            return job.applicants.filter((applicant) => applicant.applicantData.userId === currentUserId)
        })
        setUserAppliedJobs(UserAppliedJobs)
    }, [])

    const handleFilteration = (jobTypes) => {
        if (!companyname && !location && !Object.values(jobTypes).some(value => value)) {
            setfilterJobs(jobList);
            return;
        }

        const filteredJobs = jobList.filter((job) => {
            const companyMatch = companyname
                ? job.CompanyName.toLowerCase().includes(companyname.toLowerCase())
                : true;
            const locationMatch = location
                ? job.location.toLowerCase().includes(location.toLowerCase())
                : true;

            let typeMatch = true;
            if (Object.values(jobTypes).some(value => value)) {
                typeMatch = false;
                if (jobTypes["Full-Time"] && job.type.toLowerCase() === "full-time") typeMatch = true;
                if (jobTypes["Part-Time"] && job.type.toLowerCase() === "part-time") typeMatch = true;
                if (jobTypes.Contract && job.type.toLowerCase() === "contract") typeMatch = true;
                if (jobTypes.Internship && job.type.toLowerCase() === "internship") typeMatch = true;
            }

            return companyMatch && locationMatch && typeMatch;
        });

        setfilterJobs(filteredJobs);
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>;
    }

    return (
        <div className="w-full h-full p-4">
            <div className="w-full mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    {profileDetails?.role === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}
                </h1>

                <div>
                    {profileDetails?.role === "candidate" ? (
                        <FilterButton
                            companyname={companyname}
                            setcompanyname={setcompanyname}
                            location={location}
                            setLocation={setLocation}
                            handleFilteration={handleFilteration}
                        />
                    ) : (
                        <PostNewJob profileDetails={profileDetails} />
                    )}
                </div>
            </div>
            {eligiblityStatus && <p className='text-red-600 text-center'>Please Upgrade to Premium Plan to Apply For More Jobs</p>}
            <div className="container mx-auto">
                {filterJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filterJobs.map((jobItem) => (
                            profileDetails?.role === "candidate" ? (
                                <JobListingCandidate
                                    key={jobItem._id}
                                    profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                    job={jobItem}
                                    UserAppliedJobs={UserAppliedJobs}
                                    eligiblityStatus={eligiblityStatus}
                                    seteligiblityStatus={seteligiblityStatus}
                                />
                            ) : (
                                <JobListing
                                    key={jobItem._id}
                                    profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                    job={jobItem}
                                    setDrawerOpen={setDrawerOpen}
                                    drawerOpen={drawerOpen}
                                    setjobDetailsForDrawer={setjobDetailsForDrawer}
                                />
                            )
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Image
                            src="/assets/job-match.svg"
                            alt="No jobs found"
                            width={120}
                            height={120}
                            className="mx-auto mb-4 opacity-50"
                        />
                        <p className="text-gray-500 text-lg">
                            {jobList.length === 0 ? "No jobs available." : "No matching jobs found."}
                        </p>
                    </div>
                )}
            </div>
            <DrawerDemo
                setDrawerOpen={setDrawerOpen}
                drawerOpen={drawerOpen}
                job={jobDetailsForDrawer}
            />
        </div>
    );
};

export default JobsComponent;