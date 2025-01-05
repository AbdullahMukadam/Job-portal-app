import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: String,
        required: true,
        trim: true
    },
    recruiterId: {
        type: String,
        required: true,
        trim: true
    },
    applicants: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;