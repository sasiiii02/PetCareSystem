import React from 'react'
import { 
  PawPrint, 
  ShoppingCart, 
  Calendar, 
  HeartHandshake, 
  Dog, 
  Cat, 
  Stethoscope, 
  BookOpen 
} from 'lucide-react'

// Import images
import heroBg from "../assets/Home01.jpeg";
import adoptionImage from "../assets/Adoption2.jpeg";
import appointmentImage from "../assets/Adoption3.jpeg";
import storeImage from "../assets/Adoption4.jpeg";
import AboutUs from './AboutUs';

const PetPlatformHomePage = () => {
  return (
    <div className="min-h-screen bg-[#FFF5E7] text-gray-800 font-sans">
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(245, 239, 234, 0.7)',
        }}
      >
        <div className="text-center max-w-4xl px-6">
          <h1 className="text-7xl font-black text-amber-900 mb-6 mt-30 tracking-tight leading-tight drop-shadow-lg">
            Your Complete Pet Companion Platform
          </h1>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Adopt, Care, Shop, and Connect - Everything Your Furry Friend Needs in One Place
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-[#D08860] text-white text-lg px-10 py-4 rounded-full hover:bg-[#B3714E] transition-colors duration-300 flex items-center shadow-lg hover:shadow-xl">
              <PawPrint className="mr-3 w-6 h-6" /> Start Your Journey
            </button>
            <button className="border-2 border-[#D08860] text-[#D08860] text-lg px-10 py-4 rounded-full hover:bg-[#D08860] hover:text-white transition-colors duration-300 flex items-center shadow-lg hover:shadow-xl">
              <HeartHandshake className="mr-3 w-6 h-6" /> Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {[
            { 
              icon: <Dog className="w-16 h-16 text-[#D08860]" />, 
              title: 'Pet Adoption', 
              description: 'Find your perfect companion',
              bgColor: 'bg-[#FFF3E0]',
              textColor: 'text-[#D08860]',
            },
            { 
              icon: <Stethoscope className="w-16 h-16 text-[#5A9367]" />, 
              title: 'Pet Care', 
              description: 'Professional veterinary services',
              bgColor: 'bg-[#E6F3E5]',
              textColor: 'text-[#5A9367]',
            },
            { 
              icon: <ShoppingCart className="w-16 h-16 text-[#6A8CAF]" />, 
              title: 'Pet Store', 
              description: 'Quality products for pets',
              bgColor: 'bg-[#E6F1F9]',
              textColor: 'text-[#6A8CAF]',
            },
            { 
              icon: <Calendar className="w-16 h-16 text-[#9C7BBC]" />, 
              title: 'Events', 
              description: 'Community and workshops',
              bgColor: 'bg-[#F2EAF9]',
              textColor: 'text-[#9C7BBC]',
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className={`${service.bgColor} p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 ease-in-out text-center group`}
            >
              <div className="mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${service.textColor}`}>{service.title}</h3>
              <p className="text-gray-600 text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 items-center gap-10 p-16 bg-white">
        <div className="space-y-8 px-6">
          <h2 className="text-5xl font-bold text-[#3A4F41] mb-4">Streamlined Adoption Management</h2>
          <p className="text-xl text-[#5A6F5C] mb-6 leading-relaxed">
            Our advanced adoption platform connects potential pet parents with their perfect companion. 
            We provide comprehensive profiles, behavioral insights, and personalized matching algorithms 
            to ensure successful, long-lasting pet adoptions.
          </p>
          <button className="bg-[#D08860] text-white text-lg px-10 py-4 rounded-full hover:bg-[#B3714E] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Explore Adoptions
          </button>
        </div>
        <div>
          <img 
            src={adoptionImage} 
            alt="Pet Adoption" 
            className="w-full h-[600px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Appointment Management Section */}
      <div className="grid md:grid-cols-2 items-center gap-10 p-16 bg-[#FFF5E7]">
        <div>
          <img 
            src={appointmentImage} 
            alt="Veterinary Appointments" 
            className="w-full h-[600px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-8 px-6">
          <h2 className="text-5xl font-bold text-[#3A4F41] mb-4">Effortless Appointment Scheduling</h2>
          <p className="text-xl text-[#5A6F5C] mb-6 leading-relaxed">
            Our intelligent appointment system makes veterinary care simple and convenient.
          </p>
          <button className="bg-[#5A9367] text-white text-lg px-10 py-4 rounded-full hover:bg-[#47795A] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Schedule Consultation
          </button>
        </div>
      </div>

      {/* Store Management Section */}
      <div className="grid md:grid-cols-2 items-center gap-10 p-16 bg-white">
        <div className="space-y-8 px-6">
          <h2 className="text-5xl font-bold text-[#3A4F41] mb-4">Smart Pet Store Management</h2>
          <p className="text-xl text-[#5A6F5C] mb-6 leading-relaxed">
            Our comprehensive pet store platform offers curated, high-quality products tailored to your pet's specific needs.
          </p>
          <button className="bg-[#6A8CAF] text-white text-lg px-10 py-4 rounded-full hover:bg-[#5A7A9F] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Visit Store
          </button>
        </div>
        <div>
          <img 
            src={storeImage} 
            alt="Pet Store" 
            className="w-full h-[600px] object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  )
}

export default PetPlatformHomePage