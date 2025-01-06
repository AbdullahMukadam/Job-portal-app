import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    isPremiumUser: {
        required: true,
        type: Boolean,
        default: false
    },
    membershipType: {
        type: String,
        default: 'free'
    },
    membershipstartDate: {
        type: String,
        default: () => new Date().toISOString()
    },
    membershipendDate: {
        type: String,
        default: () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date.toISOString();
        }
    },
    RecruiterInfo: {
        required: function() {
            return this.role === 'recruiter';
        },
        type: {
            name: {
                type: String,
                required: true
            },
            companyName: {
                type: String,
                required: true
            },
            companyRole: {
                type: String,
                required: true
            }
        },
        _id: false
    },
    CandidateInfo: {
        required: function() {
            return this.role === 'candidate';
        },
        type: {
            resume: {
                type: String,
                required: true
            },
            Name: {
                type: String,
                required: true
            },
            CurrentJobLocation: {
                type: String,
                required: true
            },
            PreferedJobLocation: {
                type: String,
                required: true
            },
            CurrentSalary: {
                type: String,
                required: true
            },
            NoticePeriod: {
                type: String,
                required: true
            },
            Skills: {
                type: String,
                required: true
            },
            CurrentCompany: {
                type: String,
                required: true
            },
            PreviousCompany: {
                type: String,
                required: true
            },
            TotalExperience: {
                type: Boolean,
                required: true
            },
            College: {
                type: String,
                required: true
            },
            GraduatedYear: {
                type: Boolean,
                required: true
            },
            LinkedInProfile: {
                type: String,
                required: true
            },
            GithubProfile: {
                type: String,
                required: true
            }
        },
        _id: false
    }
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
export default Profile;