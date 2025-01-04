import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    CompanyName: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    skills: {
        required: true,
        type: String
    },
    recruiterId: {
        required: true,
        type: String
    },
    applicants: [
        {
            name: {
                type: String
            },
            email: {
                type: String
            },
            status: {
                type: String
            },
            userId: {
                type: String
            },
        }
    ]
});

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;

