import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { fetchUserDetails } from './actions/detailsActions';


export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    const user = await currentUser();
    const profileDetails = await fetchUserDetails(userId);

    
    if (user && !profileDetails?._id) {
      redirect("/onBoard");
    }
  }

  return (
    <div className="w-full h-full p-2">
      <h1 className="text-2xl font-bold mb-4">Welcome to Our Platform</h1>
      <AfterLogin userId={userId} />
    </div>
  );
}
