'use client';

import { Link } from 'react-router-dom';
import { HeartHandshake, PawPrint, Users, ShieldCheck } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-[#FFF5E7] min-h-screen mt-30">
      {/* Hero Section */}
      <div className="relative bg-[#3A4F41] pt-32 pb-20 px-6 sm:px-12 lg:pt-40 lg:pb-28 lg:px-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#3A4F41] opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Story, Your Pet's Journey
          </h1>
          <p className="mt-6 text-xl text-[#F5EFEA] max-w-3xl mx-auto">
            Dedicated to creating meaningful connections between pets and loving families since 2015.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              to="/adoption" 
              className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-[#3A4F41] bg-[#D08860] hover:bg-[#B3714E] transition-colors duration-300 shadow-lg"
            >
              <PawPrint className="mr-2 h-5 w-5" />
              Meet Our Pets
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center px-6 py-3 border-2 border-[#D08860] text-base font-medium rounded-full text-white hover:bg-[#D08860] hover:text-white transition-colors duration-300"
            >
              <HeartHandshake className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-[#3A4F41] sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-[#5A6F5C] lg:mx-auto">
              To revolutionize pet care by providing comprehensive services that nurture the bond between pets and their families.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <HeartHandshake className="h-12 w-12 text-[#D08860]" />,
                  title: "Compassionate Care",
                  description: "Every pet receives individualized attention and love from our dedicated team."
                },
                {
                  icon: <ShieldCheck className="h-12 w-12 text-[#5A9367]" />,
                  title: "Safety First",
                  description: "Rigorous health checks and safe environments for all our furry guests."
                },
                {
                  icon: <Users className="h-12 w-12 text-[#6A8CAF]" />,
                  title: "Community Focus",
                  description: "Building a supportive network of pet lovers and experts."
                },
                {
                  icon: <PawPrint className="h-12 w-12 text-[#9C7BBC]" />,
                  title: "Happy Tails",
                  description: "Creating success stories one adoption at a time."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-full bg-[#FFF5E7]">
                    {item.icon}
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-[#3A4F41]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base text-[#5A6F5C]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 px-6 sm:px-12 lg:px-24 bg-[#FFF5E7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#3A4F41] sm:text-4xl text-center">
            Meet Our Team
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-[#5A6F5C] lg:mx-auto text-center">
            Passionate professionals dedicated to pet wellness and happiness.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Lead Veterinarian",
                bio: "With 15 years of experience in animal care, Dr. Johnson ensures all pets receive top medical attention.",
                image: "/team1.jpg"
              },
              {
                name: "Michael Chen",
                role: "Adoption Specialist",
                bio: "Michael has matched over 500 pets with their forever homes through his compassionate approach.",
                image: "/team2.jpg"
              },
              {
                name: "Emma Rodriguez",
                role: "Pet Behaviorist",
                bio: "Emma's innovative training methods help pets adjust seamlessly to their new families.",
                image: "/team3.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src={member.image} 
                    alt={member.name}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '/default-profile.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#3A4F41]">{member.name}</h3>
                  <p className="mt-1 text-[#D08860] font-medium">{member.role}</p>
                  <p className="mt-4 text-[#5A6F5C]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#3A4F41] py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Begin Your Pet Journey?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-[#F5EFEA] lg:mx-auto">
            Whether you're looking to adopt, need pet care services, or want to join our community, we're here to help.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 border border-transparent text-base font-medium rounded-full text-[#3A4F41] bg-[#D08860] hover:bg-[#B3714E] transition-colors duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link 
              to="/volunteer" 
              className="px-6 py-3 border-2 border-[#D08860] text-base font-medium rounded-full text-white hover:bg-[#D08860] hover:text-white transition-colors duration-300"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
