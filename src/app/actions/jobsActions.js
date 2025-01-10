'use server'

import ConnectToDb from "@/database"
import Job from "@/Models/Job"
import { revalidatePath } from "next/cache"
import nodemailer from "nodemailer"

export async function createJobAction(formData, pathToRevalidate) {
    try {
        await ConnectToDb();

        if (!formData) {
            return {
                success: false,
                message: "Form Data Not Received"
            }
        }


        const jobData = {
            CompanyName: String(formData.CompanyName),
            type: String(formData.type),
            title: String(formData.title),
            location: String(formData.location),
            description: String(formData.description),
            skills: String(formData.skills),
            recruiterId: String(formData.recruiterId),
            applicants: []
        };

        const newJob = await Job.create(jobData);

        if (newJob) {
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: "Your job has been successfully posted"
            };
        }

        return {
            success: false,
            message: "Failed to create job"
        };

    } catch (error) {
        console.error('Error in createJobAction:', error);
        return {
            success: false,
            message: error.message || "An error occurred while creating the job"
        };
    }
}

export async function fetchJobPostForRecruiter(id) {
    try {
        if (!id) {
            return {
                success: false,
                message: 'Recruiter ID is required',
                jobs: []
            };
        }

        await ConnectToDb();

        const jobs = await Job.find({ recruiterId: id }).lean();

        if (!jobs) {
            return {
                success: false,
                message: 'No jobs found',
                jobs: []
            };
        }

        const serializedJobs = jobs.map(job => ({
            _id: job._id.toString(),
            CompanyName: job.CompanyName,
            type: job.type,
            title: job.title,
            location: job.location,
            description: job.description,
            skills: job.skills,
            recruiterId: job.recruiterId,
            applicants: job.applicants,
            createdAt: job.createdAt.toISOString(),
            updatedAt: job.updatedAt.toISOString()
        }));

        return {
            success: true,
            message: 'Jobs fetched successfully',
            jobs: serializedJobs
        };

    } catch (error) {
        console.error('Error in fetchJobPostForRecruiter:', error);
        return {
            success: false,
            message: error.message || 'An error occurred while fetching jobs',
            jobs: []
        };
    }
}

export async function fetchJobPostForCandidate() {
    try {
        await ConnectToDb()

        const jobs = await Job.find({}).lean()
        if (jobs) {
            const serializedJobs = jobs.map(job => ({
                _id: job._id.toString(),
                CompanyName: job.CompanyName,
                type: job.type,
                title: job.title,
                location: job.location,
                description: job.description,
                skills: job.skills,
                recruiterId: job.recruiterId,
                applicants: job.applicants,
                createdAt: job.createdAt.toISOString(),
                updatedAt: job.updatedAt.toISOString()
            }))

            return {
                success: true,
                message: 'Jobs fetched successfully',
                jobs: serializedJobs
            };
        }
    } catch (error) {
        console.error('Error in fetchJobPostForCandidate:', error);
        return {
            success: false,
            message: error.message || 'An error occurred while fetching jobs',
            jobs: []
        };
    }
}

export async function JobApplicantApply(jobId, applicantData, pathToRevalidate) {
    try {
        if (!jobId || !applicantData) {
            return {
                success: false,
                message: 'An error occurred while Applying to Job',
            };
        }

        const job = await Job.findByIdAndUpdate(
            jobId,
            {
                $push: {
                    applicants: { applicantData }
                }
            }, { new: true }
        )
        if (job) {
            console.log(job)
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: 'Succefully Applied to Job',
            };
        }
    } catch (error) {
        console.error('Error in JobApplicantApply:', error);
        return {
            success: false,
            message: error.message || 'An error occurred while Applying to Job',
        };
    }
}

export async function SendEmailToCandidate() {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        })

        const response = await transporter.sendMail({
            from: "",
            to: 'your_email@example.com',
            subject: `New message from `,
            text: "",
            html: `<p>You have a new message from ():</p><p></p>`,
        })

        if (response) {
            return {
                success: true,
                message: "An Mail has been send to user to Inform about the application status"
            }
        }



    } catch (error) {
        console.error('Error in Sending EMAIL:', error);
        return {
            success: false,
            message: error.message || 'An error occurred while sending the Email',
        };
    }
}