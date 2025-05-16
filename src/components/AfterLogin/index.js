"use client"
import { login } from '@/app/Slices/AuthSlice'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardTitle } from '../ui/card'
import { BriefcaseBusiness } from 'lucide-react'
import { ChartComponent } from '@/utils/Charts/chart'
import { TableComponent } from '@/utils/Table/table'
import { fetchJobPostForCandidate } from '@/app/actions/jobsActions'



export default function AfterLogin({ userId, Alljobs, profileDetails }) {
    const dispatch = useDispatch()
    const jobs = useSelector((state) => state.job.jobs)
    const role = profileDetails?.role === "candidate" ? "candidate" : "recruiter"
    const [userApplications, setuserApplications] = useState([])
    const [jobsArrayforTable, setjobsArrayforTable] = useState([])
    const [userJobHistory, setuserJobHistory] = useState({
        totalAppliedJobs: 0,
        totalAcceptedJobs: 0,
        totalRejectedJobs: 0
    })
    const [recruiterJobHistory, setrecruiterJobHistory] = useState({
        totaljobsPosted: 0,
        totalApplicants: 0,
    })

    useEffect(() => {
        if (userId) {
            dispatch(login(userId))
            getUserData()
        }
    }, [userId, dispatch])

    const getUserData = useCallback(async () => {

        if (Alljobs && role === "candidate") {
            const userApps = Alljobs.reduce((acc, job) => {
                const matchingApplicants = job.applicants
                    .filter(applicant => applicant.applicantData.userId === userId)
                    .map(applicant => ({
                        ...applicant,
                        jobId: job._id,
                        jobTitle: job.title,
                        companyName: job.CompanyName,
                        jobDescription: job.description,
                        jobLocation: job.location,
                        jobType: job.type,
                        jobSkills: job.skills
                    }));

                return acc.concat(matchingApplicants);
            }, []);

            setuserApplications(userApps)
            console.log(userApps)
        } else {
            setuserApplications(Alljobs)
            //console.log(Alljobs)
        }

    }, [userId])

    const calculateJobsInfo = useCallback(() => {
        if (role === "candidate") {
            const totalAppliedJobs = userApplications.length
            const totalAcceptedJobs = userApplications.filter((job) => job.applicantData.status[0] === "accepted").length
            const totalRejectedJobs = userApplications.filter((job) => job.applicantData.status[0] === "rejected").length
            setuserJobHistory((prev) => ({
                ...prev,
                totalAppliedJobs: totalAppliedJobs,
                totalAcceptedJobs: totalAcceptedJobs,
                totalRejectedJobs: totalRejectedJobs
            }))
            //console.log(userJobHistory)
        } else {
            const totaljobsPosted = userApplications.length
            const totalApplicants = userApplications.flatMap((job) => job.applicants).length
            //console.log(totalApplicants)
            setrecruiterJobHistory((prev) => ({
                ...prev,
                totaljobsPosted: totaljobsPosted,
                totalApplicants: totalApplicants
            }))

        }
    }, [role, userApplications])

    const calculateJobsArrayForTable = useCallback(() => {
        if (role === "candidate") {
            // console.log(userApplications)
            const data = userApplications?.map((job) => {
                return {
                    jobId: job.jobId,
                    jobTitle: job.jobTitle,
                    companyName: job.companyName,
                    jobType: job.jobType
                }
            })
            setjobsArrayforTable(data)
        } else {
            const data = userApplications?.map((job) => {
                return {
                    jobId: job._id,
                    jobTitle: job.title,
                    companyName: job.CompanyName,
                    jobType: job.type
                }
            })
            setjobsArrayforTable(data)
        }
    }, [role, userApplications])

    useEffect(() => {
        if (userApplications) {
            calculateJobsInfo()
            calculateJobsArrayForTable()
        }
    }, [calculateJobsInfo, userApplications, calculateJobsArrayForTable])


    return (
        <div className='text-xl font-poppins text-black dark:text-white'>
            <div className='w-full'>
                <h1 className={`font-poppins font-bold mb-3`}>DashBoard</h1>
                <div className='w-full flex flex-col gap-2 lg:flex-row'>
                    <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">{role === "candidate" ? "Applied Jobs" : "Jobs Posted"}</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl '><span className='font-bold pr-2'>{role === "candidate" ? userJobHistory.totalAppliedJobs.toString() || "0" : recruiterJobHistory.totaljobsPosted.toString() || "0"}</span>Jobs</p>
                        </CardContent>
                    </Card>
                    <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">{role === "candidate" ? "Application Accepted" : "Total Applicants"}</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl '><span className='font-bold pr-2'>{role === "candidate" ? userJobHistory.totalAcceptedJobs.toString() || "0" : recruiterJobHistory.totalApplicants.toString() || "0"}</span>Jobs</p>

                        </CardContent>
                    </Card>
                    {role === "candidate" && <Card className="w-full p-1 flex flex-col justify-center">
                        <h1 className="mb-2 text-[16px] pl-2">Application Rejected</h1>
                        <hr />
                        <CardContent className="w-full flex mt-2 items-center gap-2 ">
                            <BriefcaseBusiness strokeWidth={"1px"} />
                            <p className='text-2xl '><span className='font-bold pr-2'>{userJobHistory.totalRejectedJobs.toString() || "0"}</span>Jobs</p>

                        </CardContent>
                    </Card>}
                </div>
                <div className='w-full lg:flex items-center justify-center gap-2'>
                    <Card className='w-full mt-2 lg:w-[50%] p-2'>
                        <CardTitle className="pl-2">Overview</CardTitle>
                        <ChartComponent
                            totaljobsPosted={recruiterJobHistory?.totaljobsPosted || 0}
                            totalApplicants={recruiterJobHistory?.totalApplicants || 0}
                            hasApplied={userApplications?.length > 0 ? true : false}
                            role={role}
                            totalAppliedJobs={userJobHistory?.totalAppliedJobs || 0}
                            totalAcceptedJobs={userJobHistory?.totalAcceptedJobs || 0}
                            totalRejectedJobs={userJobHistory?.totalRejectedJobs || 0}
                        />
                    </Card>
                    <Card className='w-full mt-2 lg:w-[45%] p-2'>
                        <CardTitle className="pl-2">History</CardTitle>
                        <TableComponent
                            role={role}
                            hasApplied={userApplications?.length > 0 ? true : false}
                            jobsData={jobsArrayforTable}
                        />
                    </Card>
                </div>

            </div>
        </div>
    )
}
