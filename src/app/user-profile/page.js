import UserProfile from "@/components/UserProfile"
import { fetchUserDetails } from "../actions/detailsActions"
import { auth } from '@clerk/nextjs/server'


const UserProfilePage = async () => {
    const { userId } = await auth()


    const profileDetails = await fetchUserDetails(userId)

    return (
        <div className='w-full h-full flex items-center justify-center font-poppins'>
            <UserProfile profileDetails={profileDetails} />
        </div>
    )
}

export default UserProfilePage