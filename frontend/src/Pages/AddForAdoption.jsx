import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Right_side from '../assets/Dog1.jpeg'
import { AlertCircle, Dog, Cat, Heart, CheckCircle, Camera, Upload } from 'lucide-react';
import axios from 'axios';

const PetOwnerForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Owner Information
    ownerFirstName: '',
    ownerLastName: '',
    email: '',
    phone: '',
    
    // Pet Information
    petName: '',
    petAge: '',
    petGender: '',
    petBreed: '',
    petSpecies: '',
    petDescription: '',
    petImage: null,
    
    // Additional Information
    reason: '',
    specialNeeds: false,
    vaccinated: false,
    neutered: false,
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const petSpeciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const petGenderOptions = ['Male', 'Female'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        petImage: file, // Store image file
      });
      
      // Create preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Owner Information Validation
    if (!formData.ownerFirstName.trim()) newErrors.ownerFirstName = 'First name is required';
    if (!formData.ownerLastName.trim()) newErrors.ownerLastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[^\d]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits)';
    }
    
    // Pet Information Validation
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.petAge.trim()) newErrors.petAge = 'Pet age is required';
    if (!formData.petGender) newErrors.petGender = 'Please select pet gender';
    if (!formData.petSpecies) newErrors.petSpecies = 'Please select pet species';
    if (!formData.petBreed.trim()) newErrors.petBreed = 'Pet breed is required';
    if (!formData.petDescription.trim()) newErrors.petDescription = 'Pet description is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason for giving up for adoption is required';
    
    // Image validation is optional
    if (!formData.petImage && !previewImage) newErrors.petImage = 'Please upload a pet image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  {/*const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmissionStatus('success');
      
      setTimeout(() => {
        navigate('/pet-adoption-success');
      }, 3000);
    }
  };*/}


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      for (let key in formData) {
          data.append(key, formData[key]);
      }

      try {
          const response = await axios.post("http://localhost:5000/api/foradoption", data, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          setSubmissionStatus('success');
          alert(response.data.message);
      } catch (error) {
          console.error("Error adding pet for adoption:", error);
      }
    }
  };
  const handleFormData = () => {
    navigate('/formdata');
  };
  // Success message component
  const SuccessMessage = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md">
        <CheckCircle className="mx-auto mb-6 text-green-500" size={80} />
        <h2 className="text-3xl font-bold text-[#80533b] mb-4">Pet Successfully Listed!</h2>
        <p className="text-xl mb-6">
          Thank you, {formData.ownerFirstName}! Your pet {formData.petName} has been successfully listed for adoption.
        </p>
        <p className="text-md text-gray-600 mb-6">
          We will review your listing and notify you when potential adopters show interest.
        </p>
        <button 
         
          onClick={handleFormData}
          className="bg-[#B3704D] text-white px-8 py-3 rounded-xl hover:bg-[#D08860] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      {submissionStatus === 'success' && <SuccessMessage />}
      
      <div className="min-h-screen bg-gradient-to-br from-[#F4E4D8] to-[#E6D5C1] pt-24 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden flex border-2 mt-6 mb-16">
          {/* Image Preview Section */}
          <div className="w-1/2 relative">
            <img 
            src={Right_side}
            alt="Pet adoption" 
            className="object-cover w-full h-full absolute inset-0"
            />
           
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/30 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h2 className="text-4xl font-bold mb-4">
                  Find a Loving Home for Your Pet
                </h2>
                <p className="text-xl">
                  Help your pet find the perfect family
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-4/5 p-12 overflow-y-auto bg-white">
            <div className="flex items-center justify-center mb-8">
              <Heart className="text-[#80533b] mr-3" size={50} />
              <h2 className="text-3xl font-bold text-[#80533b]">List Your Pet for Adoption</h2>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#80533b] mb-4">Owner Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ownerFirstName" className="block text-md font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="ownerFirstName"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.ownerFirstName ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.ownerFirstName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.ownerFirstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ownerLastName" className="block text-md font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="ownerLastName"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.ownerLastName ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.ownerLastName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.ownerLastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="email" className="block text-md font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-md font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#80533b] mb-4">Pet Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="petName" className="block text-md font-medium mb-2">
                      Pet Name
                    </label>
                    <input
                      type="text"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.petName ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.petName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.petName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="petAge" className="block text-md font-medium mb-2">
                      Pet Age
                    </label>
                    <input
                      type="text"
                      id="petAge"
                      name="petAge"
                      value={formData.petAge}
                      onChange={handleChange}
                      placeholder="e.g., 2 years"
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.petAge ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    />
                    {errors.petAge && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.petAge}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="petSpecies" className="block text-md font-medium mb-2">
                      Pet Species
                    </label>
                    <select
                      id="petSpecies"
                      name="petSpecies"
                      value={formData.petSpecies}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.petSpecies ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    >
                      <option value="">Select Species</option>
                      {petSpeciesOptions.map(species => (
                        <option key={species} value={species}>{species}</option>
                      ))}
                    </select>
                    {errors.petSpecies && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.petSpecies}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="petGender" className="block text-md font-medium mb-2">
                      Pet Gender
                    </label>
                    <select
                      id="petGender"
                      name="petGender"
                      value={formData.petGender}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.petGender ? 'border-red-500' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                    >
                      <option value="">Select Gender</option>
                      {petGenderOptions.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                    {errors.petGender && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.petGender}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="petBreed" className="block text-md font-medium mb-2">
                    Pet Breed
                  </label>
                  <input
                    type="text"
                    id="petBreed"
                    name="petBreed"
                    value={formData.petBreed}
                    onChange={handleChange}
                    placeholder="e.g., Golden Retriever, Siamese"
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.petBreed ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                  />
                  {errors.petBreed && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="mr-2" size={18} /> {errors.petBreed}
                    </p>
                  )}
                </div>

                {/* Enhanced Pet Image Upload Section */}
                <div className="mt-6">
                  <label htmlFor="petImage" className="block text-md font-medium mb-2">
                    Upload Pet Image
                  </label>
                  
                  <div className="mt-2">
                    <div className={`flex items-center justify-center w-full border-2 border-dashed rounded-xl p-6 ${
                      errors.petImage ? 'border-red-500' : 'border-gray-300'
                    } hover:border-[#B3704D] transition-colors`}>
                      <div className="space-y-2 text-center">
                        {previewImage ? (
                          <div className="relative mx-auto">
                            <img 
                              src={previewImage} 
                              alt="Pet preview" 
                              className="h-48 w-48 object-cover rounded-lg mx-auto"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                setFormData({...formData, petImage: null});
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex justify-center text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#B3704D] hover:text-[#D08860] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#B3704D]">
                                <span>Upload a photo</span>
                                <input 
                                  id="file-upload" 
                                  name="petImage" 
                                  type="file" 
                                  className="sr-only" 
                                  accept="image/*" 
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.petImage && (
                      <p className="mt-2 text-sm text-red-500 flex items-center">
                        <AlertCircle className="mr-2" size={18} /> {errors.petImage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="petDescription" className="block text-md font-medium mb-2">
                  Pet Description
                </label>
                <textarea
                  id="petDescription"
                  name="petDescription"
                  rows={5}
                  value={formData.petDescription}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.petDescription ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                  placeholder="Describe your pet's personality, habits, likes and dislikes..."
                ></textarea>
                {errors.petDescription && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="mr-2" size={18} /> {errors.petDescription}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="reason" className="block text-md font-medium mb-2">
                  Reason for Adoption
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.reason ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-[#B3704D] transition-all duration-300 hover:shadow-md`}
                  placeholder="Why are you putting your pet up for adoption?"
                ></textarea>
                {errors.reason && (
                  <p className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="mr-2" size={18} /> {errors.reason}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="specialNeeds"
                    name="specialNeeds"
                    checked={formData.specialNeeds}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#B3704D] focus:ring-[#D08860] border-gray-300 rounded"
                  />
                  <label htmlFor="specialNeeds" className="ml-3 text-md text-gray-900">
                    Special Needs
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="vaccinated"
                    name="vaccinated"
                    checked={formData.vaccinated}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#B3704D] focus:ring-[#D08860] border-gray-300 rounded"
                  />
                  <label htmlFor="vaccinated" className="ml-3 text-md text-gray-900">
                    Vaccinated
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="neutered"
                    name="neutered"
                    checked={formData.neutered}
                    onChange={handleChange}
                    className="h-5 w-5 text-[#B3704D] focus:ring-[#D08860] border-gray-300 rounded"
                  />
                  <label htmlFor="neutered" className="ml-3 text-md text-gray-900">
                    Neutered/Spayed
                  </label>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#B3704D] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#D08860] transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <Heart className="mr-3" size={24} /> List Pet for Adoption
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetOwnerForm;