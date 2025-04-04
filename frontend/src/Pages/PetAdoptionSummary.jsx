import React, { useState, useEffect } from 'react';
import { Heart, Edit, Trash2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Example pet data for demonstration
const examplePetData = {
  id: "demo123",
  petName: "Buddy",
  petAge: "3 years",
  petSpecies: "Dog",
  petBreed: "Golden Retriever",
  petGender: "Male",
  vaccinated: true,
  neutered: true,
  specialNeeds: false,
  petDescription: "Buddy is a friendly, energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other pets. Buddy is house-trained and knows basic commands like sit, stay, and come.",
  reason: "Moving to an apartment that doesn't allow pets.",
  ownerFirstName: "John",
  ownerLastName: "Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  petImageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
};

const PetAdoptionSummary = ({ petData = examplePetData, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(petData || {});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [previewImage, setPreviewImage] = useState(
    petData?.petImageUrl || null
  );

  const petSpeciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const petGenderOptions = ['Male', 'Female'];

  useEffect(() => {
    if (petData) {
      setFormData(petData);
      if (petData.petImageUrl) {
        setPreviewImage(petData.petImageUrl);
      }
    }
  }, [petData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file changes for pet image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        petImage: file,
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    // Only validate fields that are required
    if (!formData.petName?.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.petAge?.trim()) newErrors.petAge = 'Pet age is required';
    if (!formData.petBreed?.trim()) newErrors.petBreed = 'Pet breed is required';
    if (!formData.petDescription?.trim()) newErrors.petDescription = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock API call for the demo
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Simulate API call delay
        setStatus('success');
        setTimeout(() => {
          setStatus(null);
          setIsEditing(false);
          if (onUpdate) onUpdate(formData);
        }, 2000);
      } catch (error) {
        console.error("Error updating pet adoption:", error);
        setStatus('error');
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
    }
  };

  // Mock deletion for the demo
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this adoption listing? This action cannot be undone.")) {
      try {
        // Simulate API call
        if (onDelete) onDelete(formData.id);
        alert("Listing deleted successfully! (This is a demo)")
      } catch (error) {
        console.error("Error deleting pet adoption:", error);
        alert("Failed to delete the adoption listing. Please try again.");
      }
    }
  };

  // Status notification component
  const StatusNotification = ({ type, message }) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center 
      ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {type === 'success' ? 
        <CheckCircle className="mr-2" size={20} /> : 
        <AlertCircle className="mr-2" size={20} />
      }
      {message}
    </div>
  );

  return (
    <div className=" bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto  mt-30 mb-10">
      {status === 'success' && (
        <StatusNotification type="success" message="Pet information updated successfully!" />
      )}
      
      {status === 'error' && (
        <StatusNotification type="error" message="Failed to update. Please try again." />
      )}
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B3704D] to-[#D08860] p-6 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="text-white mr-3" size={28} />
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? "Edit Adoption Listing" : "Your Pet Adoption Listing"}
          </h2>
        </div>
        
        <div className="flex gap-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white text-[#B3704D] px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition"
              >
                <Edit className="mr-2" size={18} /> Edit
              </button>
              
              <button
                onClick={handleDelete}
                className="bg-white text-red-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition"
              >
                <Trash2 className="mr-2" size={18} /> Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="bg-white text-green-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition"
              >
                <Save className="mr-2" size={18} /> Save
              </button>
              
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(petData);
                  setPreviewImage(petData?.petImageUrl || null);
                }}
                className="bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-100 transition"
              >
                <X className="mr-2" size={18} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Pet Image */}
          <div className="w-full md:w-1/3">
            <div className="rounded-xl overflow-hidden border-2 border-gray-200 h-64 relative">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt={formData.petName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}
              
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <label className="bg-white rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                    Change Photo
                    <input 
                      type="file" 
                      className="hidden"
                      onChange={handleFileChange} 
                      accept="image/*"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          
          {/* Pet Information */}
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pet Name */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Pet Name</h3>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="petName"
                      value={formData.petName || ''}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.petName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.petName && (
                      <p className="text-red-500 text-xs mt-1">{errors.petName}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg font-medium">{formData.petName}</p>
                )}
              </div>
              
              {/* Pet Age */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Age</h3>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="petAge"
                      value={formData.petAge || ''}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.petAge ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.petAge && (
                      <p className="text-red-500 text-xs mt-1">{errors.petAge}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg">{formData.petAge}</p>
                )}
              </div>
              
              {/* Species */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Species</h3>
                {isEditing ? (
                  <select
                    name="petSpecies"
                    value={formData.petSpecies || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="">Select Species</option>
                    {petSpeciesOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg">{formData.petSpecies}</p>
                )}
              </div>
              
              {/* Breed */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Breed</h3>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="petBreed"
                      value={formData.petBreed || ''}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.petBreed ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.petBreed && (
                      <p className="text-red-500 text-xs mt-1">{errors.petBreed}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-lg">{formData.petBreed}</p>
                )}
              </div>
              
              {/* Gender */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Gender</h3>
                {isEditing ? (
                  <select
                    name="petGender"
                    value={formData.petGender || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300"
                  >
                    <option value="">Select Gender</option>
                    {petGenderOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg">{formData.petGender}</p>
                )}
              </div>
              
              {/* Health Status */}
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Health Status</h3>
                {isEditing ? (
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="vaccinated"
                        checked={formData.vaccinated || false}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4"
                      />
                      Vaccinated
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="neutered"
                        checked={formData.neutered || false}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4"
                      />
                      Neutered/Spayed
                    </label>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${formData.vaccinated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {formData.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${formData.neutered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {formData.neutered ? 'Neutered/Spayed' : 'Not Neutered/Spayed'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Special Needs */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-500 mb-1">Special Needs</h3>
              {isEditing ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="specialNeeds"
                    checked={formData.specialNeeds || false}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4"
                  />
                  Has Special Needs
                </label>
              ) : (
                <p className="text-lg">
                  {formData.specialNeeds ? 'Yes' : 'No'}
                </p>
              )}
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-500 mb-1">Description</h3>
              {isEditing ? (
                <div>
                  <textarea
                    name="petDescription"
                    value={formData.petDescription || ''}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.petDescription ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.petDescription && (
                    <p className="text-red-500 text-xs mt-1">{errors.petDescription}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-700">{formData.petDescription}</p>
              )}
            </div>
            
            {/* Reason for Adoption */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-500 mb-1">Reason for Adoption</h3>
              {isEditing ? (
                <textarea
                  name="reason"
                  value={formData.reason || ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300"
                ></textarea>
              ) : (
                <p className="text-gray-700">{formData.reason}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Owner Information - Read-only section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-[#80533b] mb-4">Owner Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Name</h4>
              <p className="text-gray-800">{formData.ownerFirstName} {formData.ownerLastName}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Email</h4>
              <p className="text-gray-800">{formData.email}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-1">Phone</h4>
              <p className="text-gray-800">{formData.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptionSummary;