import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    isPremiumUser: {
        required: true,
        type: Boolean
    },
    membershipType: {
        required: true,
        type: String
    },
    membershipstartDate: {
        required: true,
        type: String
    },
    membershipendDate: {
        required: true,
        type: String
    },
    RecruiterInfo: {
        name: {
            required: true,
            type: String
        },
        companyName: {
            required: true,
            type: String
        },
        companyRole : {
            required: true,
            type: String
        }
    },
    CandidateInfo: {
        resume: {
            required: true,
            type: String
        },
        name: {
            required: true,
            type: String
        },
        CurrentJobLocation: {
            required: true,
            type: String
        },
        PreferedJobLocation : {
            required: true,
            type: String
        },
        CurrentSalary : {
            required: true,
            type: String
        },
        NoticePeriod : {
            required: true,
            type: String
        },
        Skills : {
            required: true,
            type: String
        },
        CurrentCompany : {
            required: true,
            type: String
        },
        PreviousCompany : {
            required: true,
            type: String
        },
        TotalExperience : {
            required: true,
            type: Boolean
        },
        College : {
            required: true,
            type: String
        },
        GraduatedYear : {
            required: true,
            type: Boolean
        },
        LinkedInProfile : {
            required: true,
            type: String
        },
        GithubProfile : {
            required: true,
            type: String
        },
    },
})

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema)
export default Profile