import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
    return (
        <div className='w-full h-full p-2 flex items-center justify-center'>
            <UserProfile path="/user-profile" />
        </div>
    )
}

export default UserProfilePage