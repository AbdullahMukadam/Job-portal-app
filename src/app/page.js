import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';


export default async function Home() {
  const { userId } = await auth()


  let profileDetails = null;
  if (userId) {
    const user = await currentUser()


    if (user && !profileDetails?._id) redirect("/onBoard")
  }

  return (
    <div className="w-full h-full p-2">
      this is home page
      <AfterLogin userId={userId} />
    </div>
  );
}
