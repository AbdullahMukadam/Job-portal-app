"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostNewJob from './PostNewJob';
import JobListing from './Joblisting';
import JobListingCandidate from './JobListingCandidate';
import { DrawerDemo } from '@/utils/Drawer/Drawer';
import { AllJobList, RemoveJobList } from '@/app/Slices/JobSlice';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Calendar, Search, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

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
        <Menubar className="border-none">
            <MenubarMenu>
                <MenubarTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </Button>
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
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="bg-gray-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Job Type</Label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.keys(jobTypes).map((type) => (
                                    <label key={type} className="flex items-center space-x-2">
                                        <Checkbox
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
                            <Button className="w-full" onClick={handleApplyFilters}>
                                Apply Filters
                            </Button>
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
    const currentUserId = useSelector((state) => state.auth.userId);
    const [UserAppliedJobs, setUserAppliedJobs] = useState([]);
    const [eligiblityStatus, seteligiblityStatus] = useState(false);

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
            return job.applicants.filter((applicant) => applicant.applicantData.userId === currentUserId);
        });
        setUserAppliedJobs(UserAppliedJobs);
    }, []);

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
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Section */}
            <div className="w-full bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <Input 
                                    placeholder="Search by role" 
                                    className="pl-10 bg-gray-50"
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <Input 
                                    placeholder="Location" 
                                    className="pl-10 bg-gray-50"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <Input 
                                    placeholder="Company" 
                                    className="pl-10 bg-gray-50"
                                    value={companyname}
                                    onChange={(e) => setcompanyname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FilterButton
                                companyname={companyname}
                                setcompanyname={setcompanyname}
                                location={location}
                                setLocation={setLocation}
                                handleFilteration={handleFilteration}
                            />
                            {profileDetails?.role !== "candidate" && (
                                <PostNewJob profileDetails={profileDetails} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {profileDetails?.role === "candidate" ? (
                            <>Recommended jobs <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{filterJobs.length}</span></>
                        ) : (
                            "Jobs Dashboard"
                        )}
                    </h2>
                </div>

                {eligiblityStatus && (
                    <p className='text-red-600 text-center mb-4'>
                        Please Upgrade to Premium Plan to Apply For More Jobs
                    </p>
                )}

                {filterJobs?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filterJobs.map((jobItem) => (
                            <Card key={jobItem._id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    {profileDetails?.role === "candidate" ? (
                                        <JobListingCandidate
                                            profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                            job={jobItem}
                                            UserAppliedJobs={UserAppliedJobs}
                                            eligiblityStatus={eligiblityStatus}
                                            seteligiblityStatus={seteligiblityStatus}
                                        />
                                    ) : (
                                        <JobListing
                                            profileDetails={JSON.parse(JSON.stringify(profileDetails))}
                                            job={jobItem}
                                            setDrawerOpen={setDrawerOpen}
                                            drawerOpen={drawerOpen}
                                            setjobDetailsForDrawer={setjobDetailsForDrawer}
                                        />
                                    )}
                                </CardContent>
                            </Card>
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