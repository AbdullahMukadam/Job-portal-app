import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

async function getProfileDetails(userId) {
  try {
   /*  // Replace with your actual API endpoint
    const response = await fetch(`/api/profile/${userId}`, {
      cache: 'no-store'
    });
    return response.ok ? await response.json() : null; */
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    const user = await currentUser();
    const profileDetails = await getProfileDetails(userId);

    
    if (user && !profileDetails) {
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
