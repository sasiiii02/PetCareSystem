'use client';

import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#FFF5E7] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#3A4F41] pt-32 pb-20 px-6 sm:px-12 lg:pt-40 lg:pb-28 lg:px-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#3A4F41] opacity-90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            We'd Love to Hear From You
          </h1>
          <p className="mt-6 text-xl text-[#F5EFEA] max-w-3xl mx-auto">
            Whether you have questions about adoption, need pet care advice, or want to partner with us.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-[#3A4F41]">
              Get In Touch
            </h2>
            <p className="text-lg text-[#5A6F5C]">
              Our team is ready to assist you with any inquiries about pet adoption, care services, or general questions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#FFF3E0] p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-[#D08860]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#3A4F41]">Our Location</h3>
                  <p className="mt-1 text-[#5A6F5C]">
                    Kandy<br />
                    Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start">
            <div className="flex-shrink-0 bg-[#E6F3E5] p-3 rounded-full">
              <Phone className="h-6 w-6 text-[#5A9367]" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-[#3A4F41]">Phone</h3>
              <p className="mt-1 text-[#5A6F5C]">
                <a href="tel:+941234567" className="text-[#5A9367] hover:underline">
                  Main: (+94) 123-4567
                </a>
                <br />
                <a href="tel:+941234568" className="text-[#5A9367] hover:underline">
                  Adoption: (+94) 123-4568
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
    <div className="flex-shrink-0 bg-[#E6F1F9] p-3 rounded-full">
      <Mail className="h-6 w-6 text-[#6A8CAF]" />
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-medium text-[#3A4F41]">Email</h3>
      <p className="mt-1 text-[#5A6F5C]">
        <a href="mailto:info@fluffycare.com" className="text-[#6A8CAF] hover:underline">
          info@fluffycare.com
        </a>
        <br />
        <a href="mailto:petcare@fluffycare.com" className="text-[#6A8CAF] hover:underline">
          petcare@fluffycare.com
        </a>
      </p>
    </div>
  </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#F2EAF9] p-3 rounded-full">
                  <Clock className="h-6 w-6 text-[#9C7BBC]" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-[#3A4F41]">Hours</h3>
                  <p className="mt-1 text-[#5A6F5C]">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#3A4F41] mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#5A6F5C]">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D08860] focus:border-[#D08860] text-[#5A6F5C]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5A6F5C]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D08860] focus:border-[#D08860] text-[#5A6F5C]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#5A6F5C]">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D08860] focus:border-[#D08860] text-[#5A6F5C]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#5A6F5C]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D08860] focus:border-[#D08860] text-[#5A6F5C]"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#D08860] hover:bg-[#B3714E] transition-colors duration-300 shadow-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

     {/* Map Section */}
<div className="pb-24 px-6 sm:px-12 lg:px-24">
  <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <a 
      href="https://www.google.com/maps?q=Kandy,Sri+Lanka" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <iframe
        title="Our Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5492563520613!2d80.63500287501265!3d7.290571692717476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae367aff85c21f5%3A0xa59439bfac9c29c1!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        className="rounded-xl"
      ></iframe>
    </a>
  </div>
</div>

    </div>
  );
}
