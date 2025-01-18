import Image from 'next/image'
import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { fetchUserDetails } from './actions/detailsActions';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LoadingSpinner from '@/components/LoadingSpinner';

console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY exists:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    const user = await currentUser();
    const profileDetails = await fetchUserDetails(userId);

    
    if (user && !profileDetails?._id) {
      redirect("/onBoard");
    } else if (user && profileDetails?._id) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 rounded-lg"></div>
            <Card className="relative overflow-hidden backdrop-blur-sm bg-white/90">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
                    <p className="text-muted-foreground">Your job search journey continues here</p>
                  </div>
                  <Image 
                    src="/assets/profile-welcome.svg" 
                    alt="Profile" 
                    width={80} 
                    height={80} 
                    className="rounded-full border-2 border-primary p-1"
                  />
                </div>
                <AfterLogin userId={userId} />
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Job Matches',
                description: 'Find perfectly matched jobs based on your profile',
                icon: '/assets/job-match.svg'
              },
              {
                title: 'Applications',
                description: 'Track all your job applications in one place',
                icon: '/assets/applications.svg'
              },
              {
                title: 'Career Tips',
                description: 'Get expert advice to advance your career',
                icon: '/assets/career-tips.svg'
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                    <Image 
                      src={item.icon}
                      alt={item.title} 
                      width={200} 
                      height={150} 
                      className="w-full h-40 object-contain"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold text-primary leading-tight">
              Find Your Dream Job <br/>
              <span className="text-blue-600">Build Your Future</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with top employers and take the next step in your career journey. 
              Join thousands of professionals finding their perfect match.
            </p>
            <div className="flex space-x-4 pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-lg"></div>
              <Image 
                src="/assets/undraw_job-hunt_5umi.svg"
                alt="Job Search" 
                width={600} 
                height={400} 
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Create Profile',
                description: 'Build your professional profile in minutes',
                icon: '/assets/create-profile.svg'
              },
              {
                step: 2,
                title: 'Search Jobs',
                description: 'Browse thousands of relevant opportunities',
                icon: '/assets/search-jobs.svg'
              },
              {
                step: 3,
                title: 'Get Hired',
                description: 'Apply and land your dream job',
                icon: '/assets/get-hired.svg'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {item.step}
                  </div>
                  <Image 
                    src={item.icon}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="mx-auto mb-6"
                  />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

