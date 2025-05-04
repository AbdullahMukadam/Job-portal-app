import Image from 'next/image';
import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUserDetails } from './actions/detailsActions';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from '@/components/LoadingSpinner';
import { ArrowRight, Bell, Briefcase, BookOpen, BarChart2, ChevronRight, Search, LayoutDashboard, FileText, BookOpen as BookIcon } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();

  const commonStyles = {
    headerLink:
      "text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2",
    button:
      "inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-lg focus:outline-none focus:bg-gray-600 font-pj hover:bg-gray-600",
    statText: "text-3xl font-medium text-gray-900 sm:text-4xl font-pj dark:text-white",
    statLabel: "ml-3 text-sm text-gray-900 font-pj dark:text-white",
  };

  if (userId) {
    const user = await currentUser();
    const profileDetails = await fetchUserDetails(userId);

    if (user && !profileDetails?._id) {
      redirect("/onBoard");
    } else if (user && profileDetails?._id) {
      return (
        <div className="min-h-screen dark:bg-zinc-950 bg-gray-50">
          {/* Header Navigation */}
        

          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Welcome Section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur-xl"></div>
              <Card className="relative border border-gray-100 shadow-lg  overflow-hidden dark:bg-zinc-900">
               

                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-black inline-block dark:text-white">
                        Welcome Back!
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300">Your job search journey continues here</p>
                    </div>
                    
                  </div>

                  <div className="mt-8 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-500 shadow-sm">
                    <AfterLogin userId={userId} />
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Applied Jobs', value: '24', icon: <Briefcase className="w-4 h-4 text-blue-500" /> },
                      { label: 'Interviews', value: '5', icon: <Bell className="w-4 h-4 text-purple-500" /> },
                      { label: 'Saved Jobs', value: '12', icon: <BookIcon className="w-4 h-4 text-pink-500" /> },
                      { label: 'Profile Views', value: '86', icon: <BarChart2 className="w-4 h-4 text-indigo-500" /> }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-500 shadow-sm dark:bg-zinc-900">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {stat.icon}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-white">{stat.label}</p>
                            <p className="text-xl font-bold">{stat.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Cards */}
           

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 font-medium">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Application Submitted',
                    company: 'Senior Developer at TechCorp',
                    time: '2 hours ago',
                    icon: <FileText className="w-4 h-4 text-blue-500" />
                  },
                  {
                    title: 'Profile Updated',
                    company: 'Added new skills and experience',
                    time: 'Yesterday',
                    icon: <BookIcon className="w-4 h-4 text-green-500" />
                  },
                  {
                    title: 'Interview Scheduled',
                    company: 'Product Manager at InnovateLabs',
                    time: '3 days ago',
                    icon: <Bell className="w-4 h-4 text-purple-500" />
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-900">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-gray-500 text-sm">{activity.company}</p>
                    </div>
                    <div className="text-gray-400 text-xs">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className='bg-gray-50 dark:bg-zinc-950'>
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">
                  Find Your Dream Job Build Your Future.
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-white sm:mt-8 font-inter">
                  Connect with top employers and take the next step in your career journey.
                  Join thousands of professionals finding their perfect match.
                </p>

                <form action="#" method="POST" className="mt-8 sm:mt-10">
                  <div className="relative p-2 sm:border sm:border-gray-400 group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-gray-900 sm:focus-within:border-gray-900">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email for Job Updates"
                      className="block w-full px-4 py-4 text-gray-900 dark:text-white placeholder-gray-900 dark:placeholder-white bg-transparent border border-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                    />
                    <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                      <button type="submit" className={commonStyles.button}>
                        Get Updates
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                <div className="flex items-center">
                  <p className={commonStyles.statText}>5K+</p>
                  <p className={commonStyles.statLabel}>
                    New
                    <br />
                    Jobs
                  </p>
                </div>

                <div className="hidden sm:block">
                  <p className="text-gray-400 dark:text-white">{"//////////"}</p>
                </div>

                <div className="flex items-center">
                  <p className={commonStyles.statText}>$10M+</p>
                  <p className={commonStyles.statLabel}>
                    Sales
                    <br />
                    Achieved
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Image
                className="w-full rounded-lg"
                src="/assets/new.avif"
                alt="Fashion Style"
                height={700}
                width={600}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}