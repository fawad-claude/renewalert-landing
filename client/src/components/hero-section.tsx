import React from "react";
import { SignupForm } from "./signup-form";
import { FeatureItem } from "./feature-item";
import { Bell, ShieldCheck, Smartphone } from "lucide-react";

export function HeroSection() {
  return (
    <div className="pt-24 flex-grow flex items-center justify-center bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Left content section */}
          <div className="flex-1 max-w-2xl">
            <div className="text-center lg:text-left mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Coming Soon
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Never Miss an ID Renewal Again!
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-600 mb-2">
                Lost track of ID renewals? A smart solution is coming soon!
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 mb-8 text-center lg:text-left">
              <p>
                Are you tired of the last-minute scramble to renew your passport, visa, or other important documents?{" "}
                <span className="font-medium">We have the perfect solution for you!</span>
              </p>
              <p>
                Our upcoming app is designed to send you timely reminders for all your important renewals, 
                helping you stay ahead and stress-free. Be the first to experience the convenience of staying organized with ease.
              </p>
            </div>

            <div className="space-y-6 hidden lg:block">
              <FeatureItem 
                icon={<Bell className="text-primary" />}
                title="Timely Notifications"
                description="Get alerts before your IDs expire"
              />
              <FeatureItem 
                icon={<Smartphone className="text-primary" />}
                title="Mobile Friendly"
                description="Manage everything from your phone"
              />
              <FeatureItem 
                icon={<ShieldCheck className="text-primary" />}
                title="Secure Storage"
                description="Your data is encrypted and protected"
              />
            </div>
          </div>

          {/* Right form section */}
          <div className="lg:w-96 w-full max-w-md">
            <SignupForm />

            {/* Social proof */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">Trusted by professionals from:</p>
              <div className="flex justify-center space-x-6 opacity-70">
                <svg className="h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <svg className="h-6" viewBox="0 0 1024 276.742" fill="currentColor">
                  <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
                </svg>
                <svg className="h-6" viewBox="0 0 496 512" fill="currentColor">
                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Features section for mobile only */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:hidden">
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
              <Bell size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Timely Notifications</h3>
            <p className="text-gray-600 text-sm">Get alerts before your IDs expire</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
              <Smartphone size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Manage everything from your phone</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-semibold text-gray-800">Secure Storage</h3>
            <p className="text-gray-600 text-sm">Your data is encrypted and protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
