'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';


export default function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#F5EFEA]">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pet Care</span>
              <img 
                src="/logo.jpg" 
                alt="Pet Care Logo"  className="h-12 w-auto" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open main menu"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Home</Link>
            <Link to="/events" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Events</Link>
            <Link to="/adoption" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Adoption</Link>
            <Link to="/appointment" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Appointment</Link>
            <Link to="/marketplace" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Marketplace</Link>
            <Link to="/profile" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Profile</Link>
            <Link to="/aboutus" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">About Us</Link>
            <Link to="/contactus" className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200">Contact Us</Link>
          </div>

          {/* Desktop Log Out Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-[#D08860] hover:text-amber-900 transition-colors duration-200 hover:bg-[#B3714E]">
              Log Out
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-[#F5EFEA] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Pet Care</span>
                <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* Mobile Navigation Links */}
                <div className="space-y-2 py-6">
                  <Link to="/" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <Link to="/events" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Events</Link>
                  <Link to="/adoption" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Adoption</Link>
                  <Link to="/appointment" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Appointment</Link>
                  <Link to="/marketplace" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
                  <Link to="/profile" className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                </div>

                {/* Log Out Button */}
                <div className="py-6">
                  <Link to="/login" className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-950 hover:text-white transition-colors duration-200 hover:bg-[#D08860]" onClick={() => setMobileMenuOpen(false)}>
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
