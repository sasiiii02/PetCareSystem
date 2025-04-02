"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export default function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false); // State for login popup
  const [registerOpen, setRegisterOpen] = useState(false); // State for register popup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in
  const [intendedPath, setIntendedPath] = useState(""); // Store the intended private route

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setLoginOpen(false); // Close popup on success
        navigate(intendedPath || "/events"); // Redirect to intended path or default to /events
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setLoginError("Server error. Please try again.");
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError("");

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phoneNumber: regPhoneNumber,
          city: regCity,
          password: regPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.user.token); // Store token
        setRegisterOpen(false); // Close popup on success
        navigate(intendedPath || "/events"); // Redirect to intended path or default to /events
      } else {
        setRegError(data.message || "Registration failed");
      }
    } catch (error) {
      setRegError("Server error. Please try again.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home after logout
  };

  // Handle navigation click
  const handleNavClick = (path) => {
    const publicRoutes = ["/", "/aboutus", "/contactus"];
    if (!token && !publicRoutes.includes(path)) {
      setIntendedPath(path); // Store the intended path
      setLoginOpen(true); // Open login popup for protected routes
    } else {
      setMobileMenuOpen(false); // Close mobile menu if open
      navigate(path); // Navigate to the clicked path
    }
  };

  return (
    <div className="bg-[#F5EFEA]">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Pet Care</span>
              <img src="/logo.jpg" alt="Pet Care Logo" className="h-12 w-auto" />
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
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/appointment"
              onClick={() => handleNavClick("/appointment")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Appointment
            </Link>
            <Link
              to="/marketplace"
              onClick={() => handleNavClick("/marketplace")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Marketplace
            </Link>
            <Link
              to="/events"
              onClick={() => handleNavClick("/events")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              to="/adoption"
              onClick={() => handleNavClick("/adoption")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Adoption
            </Link>
            <Link
              to="/aboutus"
              onClick={() => handleNavClick("/aboutus")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contactus"
              onClick={() => handleNavClick("/contactus")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link
              to="/profile"
              onClick={() => handleNavClick("/profile")}
              className="text-sm font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200"
            >
              Profile
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-[#D08860] hover:text-amber-900 transition-colors duration-200 hover:bg-[#B3714E]"
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-[#D08860] hover:text-amber-900 transition-colors duration-200 hover:bg-[#B3714E]"
                >
                  Log In
                </button>
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-[#D08860] hover:text-amber-900 transition-colors duration-200 hover:bg-[#B3714E]"
                >
                  Register
                </button>
              </>
            )}
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
                  <Link
                    to="/"
                    onClick={() => handleNavClick("/")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/appointment"
                    onClick={() => handleNavClick("/appointment")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Appointment
                  </Link>
                  <Link
                    to="/marketplace"
                    onClick={() => handleNavClick("/marketplace")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Marketplace
                  </Link>
                  <Link
                    to="/events"
                    onClick={() => handleNavClick("/events")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Events
                  </Link>
                  <Link
                    to="/adoption"
                    onClick={() => handleNavClick("/adoption")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Adoption
                  </Link>
                  <Link
                    to="/aboutus"
                    onClick={() => handleNavClick("/aboutus")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contactus"
                    onClick={() => handleNavClick("/contactus")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => handleNavClick("/profile")}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-amber-950 hover:text-[#D08860] transition-colors duration-200 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                </div>

                {/* Mobile Buttons */}
                <div className="py-6 space-y-2">
                  {token ? (
                    <button
                      onClick={handleLogout}
                      className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-950 hover:text-white transition-colors duration-200 hover:bg-[#D08860]"
                    >
                      Log Out
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLoginOpen(true);
                        }}
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-950 hover:text-white transition-colors duration-200 hover:bg-[#D08860]"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setRegisterOpen(true);
                        }}
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-950 hover:text-white transition-colors duration-200 hover:bg-[#D08860]"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>

        {/* Login Popup */}
       
<Dialog open={loginOpen} onClose={() => setLoginOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-white p-8 rounded-lg shadow-lg w-96 border border-[#D08860]/20">
      <h2 className="text-2xl font-semibold text-center text-amber-950 mb-6">Welcome Back</h2>
      {loginError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{loginError}</p>
        </div>
      )}
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-amber-900 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input 
              id="remember-me" 
              type="checkbox" 
              className="h-4 w-4 text-[#D08860] focus:ring-[#D08860] border-gray-300 rounded" 
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-900">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-[#D08860] hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#D08860] text-white py-3 rounded-lg hover:bg-[#B3714E] transition-colors duration-300 font-medium mt-2"
        >
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-amber-900">
          Don't have an account?{" "}
          <button 
            onClick={() => {
              setLoginOpen(false);
              setRegisterOpen(true);
            }}
            className="text-[#D08860] hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
      <button
        onClick={() => setLoginOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </DialogPanel>
  </div>
</Dialog>


<Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-[#D08860]/20 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-center text-amber-950 mb-6">Create Your Account</h2>
      {regError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{regError}</p>
        </div>
      )}
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <label className="block text-amber-900 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regPhoneNumber}
            onChange={(e) => setRegPhoneNumber(e.target.value)}
            required
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">City</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regCity}
            onChange={(e) => setRegCity(e.target.value)}
            required
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D08860] text-white py-3 rounded-lg hover:bg-[#B3714E] transition-colors duration-300 font-medium mt-2"
        >
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-amber-900">
          Already have an account?{" "}
          <button 
            onClick={() => {
              setRegisterOpen(false);
              setLoginOpen(true);
            }}
            className="text-[#D08860] hover:underline font-medium"
          >
            Log In
          </button>
        </p>
      </div>
      <button
        onClick={() => setRegisterOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </DialogPanel>
  </div>
</Dialog>
{/* Register Popup */}
<Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <DialogPanel className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-[#D08860]/20 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-center text-amber-950 mb-6">Create Your Account</h2>
      {regError && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{regError}</p>
        </div>
      )}
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <label className="block text-amber-900 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regPhoneNumber}
            onChange={(e) => setRegPhoneNumber(e.target.value)}
            required
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">City</label>
          <input
            type="text"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regCity}
            onChange={(e) => setRegCity(e.target.value)}
            required
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2.5 border border-amber-200 rounded-lg focus:outline-none focus:border-[#D08860] focus:ring-1 focus:ring-[#D08860] bg-amber-50/50 text-amber-900"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D08860] text-white py-3 rounded-lg hover:bg-[#B3714E] transition-colors duration-300 font-medium mt-2"
        >
          Create Account
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-amber-900">
          Already have an account?{" "}
          <button 
            onClick={() => {
              setRegisterOpen(false);
              setLoginOpen(true);
            }}
            className="text-[#D08860] hover:underline font-medium"
          >
            Log In
          </button>
        </p>
      </div>
      <button
        onClick={() => setRegisterOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </DialogPanel>
  </div>
</Dialog>
      </header>
    </div>
  );
}