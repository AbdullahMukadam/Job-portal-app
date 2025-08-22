import Image from 'next/image';
import AfterLogin from '@/components/AfterLogin';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchUserDetails } from './actions/detailsActions';
import { fetchJobPostForCandidate, fetchJobPostForRecruiter } from './actions/jobsActions';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const Icon = ({ name, className }) => {
  const icons = {
    briefcase: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    ),
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    ),
    fileText: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
    ),
    award: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    ),
    trendingUp: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
    ),
    target: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
    ),
    arrowRight: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    ),
  };
  return icons[name] || null;
};

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

  const featuredJobs = [
    { title: 'Senior Frontend Developer', company: 'Innovate Inc.', location: 'Remote', type: 'Full-time', tags: ['React', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Product Manager', company: 'FutureTech', location: 'New York, NY', type: 'Full-time', tags: ['Agile', 'Roadmap', 'SaaS'] },
    { title: 'UX/UI Designer', company: 'Creative Solutions', location: 'San Francisco, CA', type: 'Contract', tags: ['Figma', 'User Research', 'Prototyping'] },
    { title: 'Backend Engineer (Go)', company: 'DataStream', location: 'Austin, TX', type: 'Full-time', tags: ['Golang', 'Microservices', 'AWS'] },
  ];

  if (userId) {
    const user = await currentUser();
    const profileDetails = await fetchUserDetails(userId);
    const Alljobs = profileDetails?.role === "candidate" ? await fetchJobPostForCandidate() : await fetchJobPostForRecruiter(userId)


    if (user && !profileDetails?._id) {
      redirect("/onBoard");
    } else if (user && profileDetails?._id && Alljobs) {
      return (
        <div className="min-h-screen dark:bg-zinc-950 bg-gray-50">
          <div className="mt-2 p-4 bg-white dark:bg-zinc-950 rounded-lg shadow-sm">
            <AfterLogin userId={userId} profileDetails={profileDetails} Alljobs={Alljobs.jobs} />
          </div>
        </div >
      );
    }
  }

  return (
    <div className='bg-gray-50 dark:bg-zinc-950 font-poppins'>

      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-poppins">
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
      <section className='py-12 bg-white sm:py-16 lg:py-24 dark:bg-zinc-900'>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl dark:text-white">How It Works</h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 dark:text-gray-300">A simple process to connect you with your next opportunity.</p>
          </div>
          <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            <CardSpotlight className="h-72 w-full md:h-96 md:w-72 bg-white dark:bg-black">
              <div className="relative flex flex-col items-center p-1">
                <div className="flex items-center justify-center w-16 h-16 text-white bg-gray-900 rounded-full dark:bg-white dark:text-gray-900">
                  <Icon name="users" className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Create Account</h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Sign up and build your professional profile in minutes.</p>
              </div>
            </CardSpotlight>
            <CardSpotlight className="h-72 w-full md:h-96 md:w-72 bg-white dark:bg-black">
              <div className="relative flex flex-col items-center p-1">
                <div className="flex items-center justify-center w-16 h-16 text-white bg-gray-900 rounded-full dark:bg-white dark:text-gray-900">
                  <Icon name="search" className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Search Jobs</h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Browse thousands of job listings with advanced filters.</p>
              </div>
            </CardSpotlight>
            <CardSpotlight className="h-72 w-full md:h-96 md:w-72 bg-white dark:bg-black">
              <div className="relative flex flex-col items-center p-2">
                <div className="flex items-center justify-center w-16 h-16 text-white bg-gray-900 rounded-full dark:bg-white dark:text-gray-900">
                  <Icon name="fileText" className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Apply & Track</h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Easily apply to jobs and track your application status.</p>
              </div>
            </CardSpotlight>
            <CardSpotlight className="h-72 w-full md:h-96 md:w-72 bg-white dark:bg-black">
              <div className="relative flex flex-col items-center p-1 ">
                <div className="flex items-center justify-center w-16 h-16 text-white bg-gray-900 rounded-full dark:bg-white dark:text-gray-900">
                  <Icon name="award" className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Get Hired</h3>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">Land your dream job and start your new chapter.</p>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-zinc-950">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl dark:text-white">Featured Job Openings</h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 dark:text-gray-300">Explore curated opportunities from leading companies.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">{job.company} - {job.location}</p>
                  </div>
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-3 py-1 rounded-full">{job.type}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold text-gray-700 bg-gray-200 dark:bg-zinc-700 dark:text-gray-200 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Link href="/sign-in" className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                    View Details <Icon name="arrowRight" className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/sign-in" className={commonStyles.button}>
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white sm:py-16 lg:py-24 dark:bg-zinc-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                Your Career Advancement Partner.
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We provide the tools and insights you need to navigate your career path with confidence.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 dark:bg-white rounded-full">
                    <Icon name="trendingUp" className="w-6 h-6 text-white dark:text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Curated Opportunities</h3>
                    <p className="mt-1 text-base text-gray-600 dark:text-gray-300">Access exclusive job listings you won't find anywhere else.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 dark:bg-white rounded-full">
                    <Icon name="target" className="w-6 h-6 text-white dark:text-gray-900" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Smart Matching</h3>
                    <p className="mt-1 text-base text-gray-600 dark:text-gray-300">Our algorithm connects you with roles that fit your skills and goals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img className="relative w-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business professionals in a meeting" />
            </div>
          </div>
        </div>
      </section>
      <footer className="py-10 bg-gray-100 sm:pt-16 lg:pt-24 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12">
            <div>
              <a href="#" className="flex items-center">
                <Icon name="briefcase" className="w-8 h-8 text-gray-900 dark:text-white" />
                <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">JobBoard</span>
              </a>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400">The best place to find your next career opportunity.</p>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Company</p>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About Us</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Careers</a></li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Resources</p>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">Follow Us</p>
              {/* Add social icons here if needed */}
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-zinc-800 pt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 JobBoard, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}