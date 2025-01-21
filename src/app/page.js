import Image from 'next/image';
import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUserDetails } from './actions/detailsActions';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    const user = await currentUser();
    const profileDetails = await fetchUserDetails(userId);
    
    if (user && !profileDetails?._id) {
      redirect("/onBoard");
    } else if (user && profileDetails?._id) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Welcome Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl"></div>
              <Card className="relative border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back!
                      </h1>
                      <p className="text-gray-600">Your job search journey continues here</p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"></div>
                      <Image 
                        src="/assets/profile-welcome.svg" 
                        alt="Profile" 
                        width={80} 
                        height={80} 
                        className="relative rounded-full border-2 border-blue-500/30 p-1"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <AfterLogin userId={userId} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Job Matches',
                  description: 'Find perfectly matched jobs based on your profile',
                  icon: '/assets/job-match.svg',
                  gradient: 'from-blue-500/10 to-blue-600/10'
                },
                {
                  title: 'Applications',
                  description: 'Track all your job applications in one place',
                  icon: '/assets/applications.svg',
                  gradient: 'from-purple-500/10 to-purple-600/10'
                },
                {
                  title: 'Career Tips',
                  description: 'Get expert advice to advance your career',
                  icon: '/assets/career-tips.svg',
                  gradient: 'from-pink-500/10 to-pink-600/10'
                }
              ].map((item, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 border-0 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <CardContent className="relative p-6 space-y-4">
                    <div className="h-40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Image 
                        src={item.icon}
                        alt={item.title} 
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Find Your Dream Job{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build Your Future
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with top employers and take the next step in your career journey. 
              Join thousands of professionals finding their perfect match.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
              <Image 
                src="/assets/undraw_job-hunt_5umi.svg"
                alt="Job Search" 
                width={600} 
                height={400} 
                className="relative rounded-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Create Profile',
                description: 'Build your professional profile in minutes',
                icon: '/assets/create-profile.svg',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                step: 2,
                title: 'Search Jobs',
                description: 'Browse thousands of relevant opportunities',
                icon: '/assets/search-jobs.svg',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                step: 3,
                title: 'Get Hired',
                description: 'Apply and land your dream job',
                icon: '/assets/get-hired.svg',
                gradient: 'from-pink-500 to-pink-600'
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="relative p-8 space-y-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <div className="h-32 flex items-center justify-center">
                    <Image 
                      src={item.icon}
                      alt={item.title}
                      width={120}
                      height={120}
                      className="transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}