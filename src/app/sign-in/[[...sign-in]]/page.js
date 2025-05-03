"use client"
import { SignIn } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image with overlay text */}
      <div className="hidden lg:flex lg:w-1/2 relative text-white">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/assets/new.avif')"}}></div>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/70"></div>
        
        {/* Content positioned over the image */}
        <div className="relative z-10 p-12 flex items-center justify-center w-full">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Welcome to Platform</h1>
            <p className="text-indigo-100 text-lg mb-8">Securely access your account and manage your experience with our powerful dashboard.</p>
            
            {/* Testimonials/Social proof */}
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AV</span>
                </div>
                <div>
                  <p className="text-white italic">"This platform completely transformed how we manage our workflow."</p>
                  <p className="text-indigo-100 text-sm mt-1">Alex Vance, Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="h-16 w-16 inline-flex items-center justify-center mb-4">
              <img src="/assets/logo-job.jpg" alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>
          
          {/* Sign-in component with custom styling container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {mounted && <SignIn />}
          </div>
          
          {/* Help links */}
          <div className="mt-8 text-center">
           
            <p className="text-gray-500 text-sm mt-2">
              <a href="#" className="hover:text-indigo-600">
                Forgot password?
              </a>
              {' · '}
              <a href="#" className="hover:text-indigo-600">
                Help & Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}