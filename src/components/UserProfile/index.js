

import CandidateProfile from "./CandidateProfile"
import RecruiterProfile from "./RecruiterProfile"

export default async function UserProfile({profileDetails}) {
    
    if (profileDetails?.role === "candidate") {
        return (
            <div className="w-full h-full p-1">
                <CandidateProfile profileDetails={profileDetails} />
            </div>

        )
    }
    return (
        <div className="w-full h-full p-1">
            <RecruiterProfile profileDetails={profileDetails} />
        </div>
    )
}