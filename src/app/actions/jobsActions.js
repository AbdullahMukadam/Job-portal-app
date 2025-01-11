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

export async function JobApplicationSelectedAction(jobId, userId) {
    try {
        await ConnectToDb()

        const newStatus = ["accepted"]

        const job = await Job.findOneAndUpdate(
            { _id: jobId, "applicants.applicantData.userId": userId },
            { $set: { "applicants.$.applicantData.status": newStatus } },
            { new: true }
        )

        if (!job) {
            return {
                success: false,
                message: "Job or applicant not found.",
            };
        }

        return {
            success: true,
            message: "Applicant status updated successfully.",

        };



    } catch (error) {
        console.error('Error in JobApplicationStatus:', error);
        return {
            success: false,
            message: error.message || 'An error occurred',
        };
    }
}

export async function JobApplicationRejectedAction(jobId, userId) {
    try {
        await ConnectToDb()

        const newStatus = ["rejected"]

        const job = await Job.findOneAndUpdate(
            { _id: jobId, "applicants.applicantData.userId": userId },
            { $set: { "applicants.$.applicantData.status": newStatus } },
            { new: true }
        )

        if (!job) {
            return {
                success: false,
                message: "Job or applicant not found.",
            };
        }

        return {
            success: true,
            message: "Applicant status updated successfully.",
        };



    } catch (error) {
        console.error('Error in JobApplicationStatus:', error);
        return {
            success: false,
            message: error.message || 'An error occurred',
        };
    }
}

export async function SendEmailToCandidate(email, candidateEmail, ApplicationStatus, jobName) {
    try {
        // Create transporter with Gmail app password
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: "jobportalapp3@gmail.com", // Your Gmail address
                pass: "qfzr qbzm rlzw yvxm" // Your Gmail App Password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email options
        const mailOptions = {
            from: '"Job Portal" <jobportalapp3@gmail.com>', // Sender name and email
            to: candidateEmail,
            subject: `Job Application Status Update: ${ApplicationStatus}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Job Application Status Update</h2>
                    <p>Dear Candidate,</p>
                    <p>Your application for the position of <strong>${jobName}</strong> has been <strong>${ApplicationStatus}</strong>.</p>
                    <p>Thank you for your interest in our organization.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p>HR Team</p>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        if (info.messageId) {
            console.log('Email sent successfully:', info.messageId);
            return {
                success: true,
                message: "Email notification sent successfully"
            };
        }

        throw new Error("Failed to send email");

    } catch (error) {
        console.error('Error in SendEmailToCandidate:', error);
        return {
            success: false,
            message: error.message || 'Failed to send email notification'
        };
    }
}