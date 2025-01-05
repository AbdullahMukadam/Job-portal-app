'use server'

import ConnectToDb from "@/database"
import Job from "@/Models/Job"
import { revalidatePath } from "next/cache"

export async function createJobAction(formData, pathToRevalidate) {
    try {
        await ConnectToDb();

        const requiredFields = ['CompanyName', 'type', 'title', 'location', 'description', 'skills', 'recruiterId'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                return {
                    success: false,
                    message: `${field} is required`
                };
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
                message: 'Recruiter ID is required'
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

        return {
            success: true,
            message: 'Jobs fetched successfully',
            jobs: jobs
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