"use client"
import { SignUp } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-poppins">
      {/* Left side - Image with overlay text */}
      <div className="hidden lg:flex lg:w-1/2 relative text-white">
        {/* Background image - using a different image than signin for variety but maintaining brand consistency */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/new.avif')" }}></div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/70"></div>

        {/* Content positioned over the image */}
        <div className="relative z-10 p-12 flex items-center justify-center w-full">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
            <p className="text-indigo-100 text-lg mb-8">Create your account today and unlock the full potential of our powerful tools and features.</p>

            {/* Benefits section - replaces testimonials for sign-up */}

          </div>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50 dark:bg-zinc-950">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create your account</h2>
            <p className="text-gray-500 mt-2 dark:text-white">Join thousands of users worldwide</p>
          </div>

          {/* Sign-up component with custom styling container */}
          
            {mounted && <SignUp />}
         

          {/* Help links */}
          {/* <div className="mt-8 text-center">
           
            <p className="text-gray-500 text-sm mt-2">
              <a href="#" className="hover:text-indigo-600">
                Terms & Conditions
              </a>
              {' · '}
              <a href="#" className="hover:text-indigo-600">
                Privacy Policy
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}