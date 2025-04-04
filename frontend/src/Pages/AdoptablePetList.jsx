import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import all the pet images
import Dog2 from '../assets/DogImage/Dog2.jpeg';
import Dog3 from '../assets/DogImage/Dog3.jpeg';
import Dog4 from '../assets/DogImage/Dog4.jpeg';
import Dog5 from '../assets/DogImage/Dog5.jpeg';
import Dog6 from '../assets/DogImage/Dog6.jpeg';
import Dog7 from '../assets/DogImage/Dog7.jpeg';
import Dog8 from '../assets/DogImage/Dog8.jpeg';
import Dog9 from '../assets/DogImage/Dog9.jpeg';
import Dog10 from '../assets/DogImage/Dog10.jpeg';
import Dog11 from '../assets/DogImage/Dog11.jpeg';

import Cat1 from '../assets/CatImage/Cat1.jpeg';
import Cat2 from '../assets/CatImage/Cat2.jpeg';
import Cat3 from '../assets/CatImage/Cat3.jpeg';
import Cat4 from '../assets/CatImage/Cat4.jpeg';
import Cat5 from '../assets/CatImage/Cat5.jpeg';
import Cat6 from '../assets/CatImage/Cat6.jpeg';
import Cat7 from '../assets/CatImage/Cat7.jpeg';

// Icons remain the same as in the original code
const DogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.447-4.5 2.823-4.5 5.5 0 5.656 2 10 6 10 1.957 0 3.758-1.423 4.785-3.938L10 14.172V5.172Z"/>
    <path d="M14 14.172c0 1.39 1.577 2.493 3.5 2.172 2.823-.447 4.5-2.823 4.5-5.5 0-5.656-2-10-6-10-1.957 0-3.758 1.423-4.785 3.938L14 9.828V14.172Z"/>
  </svg>
);

const CatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <path d="M12 5c.67 0 1.35.09 2 .25a7.98 7.98 0 0 1 7 7.75v6l-3-3h-4a7.98 7.98 0 0 1-7-7.75V8l3 3V6c0-.67.09-1.35.25-2z"/>
    <path d="M10 16a3 3 0 1 0 6 0"/>
  </svg>
);

const PawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17a4 4 0 0 0-8 0"/>
    <path d="M9 17a4 4 0 0 1 8 0"/>
    <path d="M15 14a4 4 0 0 0-8 0"/>
    <path d="M6.5 10C5.12 10 4 8.88 4 7.5S5.12 5 6.5 5 9 6.12 9 7.5 7.88 10 6.5 10zM16.5 10c-1.38 0-2.5-1.12-2.5-2.5S15.12 5 16.5 5 19 6.12 19 7.5 17.88 10 16.5 10z"/>
  </svg>
);

// Expanded initialPets array from second code
const initialPets = [
  // Dogs
  {
    id: 1,
    name: 'Buddy',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'Male',
    description: 'Friendly and energetic dog looking for an active family.',
    image: Dog2
  },
  {
    id: 11,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Tabby',
    age: 2,
    gender: 'Female',
    description: 'Playful and loving cat who enjoys cuddles and sunbathing.',
    image: Cat1
  },
  {
    id: 2,
    name: 'Max',
    type: 'Dog',
    breed: 'Labrador',
    age: 5,
    gender: 'Male',
    description: 'Calm and well-trained dog perfect for a relaxed household.',
    image: Dog3
  },
  {
    id: 12,
    name: 'Oliver',
    type: 'Cat',
    breed: 'Siamese',
    age: 3,
    gender: 'Male',
    description: 'Vocal and social cat with striking blue eyes.',
    image: Cat2
  }
];

// Image mapping for default pet images
const defaultImages = {
  Dog: Dog2,
  Cat: Cat1
};

// Map for additional dog and cat images to use randomly if needed
const dogImages = [Dog2, Dog3, Dog4, Dog5, Dog6, Dog7, Dog8, Dog9, Dog10, Dog11];
const catImages = [Cat1, Cat2, Cat3, Cat4, Cat5, Cat6, Cat7];

const AdoptablePetList = () => {
  const [pets, setPets] = useState(initialPets);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Fetch pets from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/foradoption');
        
        // Map API data to the format we need for display
        const formattedPets = response.data.map(pet => ({
          id: pet._id,
          name: pet.petName,
          type: pet.petSpecies,
          breed: pet.petBreed,
          age: pet.petAge,
          gender: pet.petGender,
          description: pet.petDescription || `${pet.petBreed} ${pet.petSpecies.toLowerCase()} looking for a forever home.`,
          image: pet.petImage ? `http://localhost:5000${pet.petImage}` : 
                 pet.petSpecies === 'Dog' ? 
                    dogImages[Math.floor(Math.random() * dogImages.length)] : 
                    catImages[Math.floor(Math.random() * catImages.length)],
          status: pet.status || 'Available',
          // Include other pet properties as needed
          vaccinated: pet.vaccinated,
          neutered: pet.neutered,
          specialNeeds: pet.specialNeeds
        }));
        
        setPets(formattedPets);
        setError(null);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets. Please try again later.");
        // Use initial pets as fallback
        setPets(initialPets);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on selection
  const filteredPets = filter === 'All' 
    ? pets 
    : pets.filter(pet => pet.type === filter);

  // Render pet type icon
  const PetTypeIcon = ({ type }) => {
    return type === 'Dog' 
      ? <DogIcon /> 
      : <CatIcon />;
  };

  // Handle Adopt Me button click
  const handleAdoptClick = (pet) => {
    navigate('/adopt', { 
      state: { 
        petName: pet.name, 
        petImage: pet.image,
        petType: pet.type
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <PawIcon />
          <p className="mt-2 text-gray-600">Loading pets...</p>
        </div>
      </div>
    );
  }

  if (error && pets.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            className="bg-gradient-to-r from-[#D08860] to-[#B3704D] text-white px-4 py-2 rounded-full hover:shadow-lg"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#FFF5E6] to-[#F5EFEA] min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <h2 className="mx-auto mt-2 max-w-lg text-center text-5xl font-extrabold text-gray-900 leading-tight mb-8">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D08860] to-[#B3704D]">Adoptable Pets</span>
        </h2>
        
        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {['All', 'Dog', 'Cat'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`
                px-6 py-3 rounded-full flex items-center space-x-2
                ${filter === type 
                  ? 'bg-gradient-to-r from-[#D08860] to-[#B3704D] text-white' 
                  : 'bg-white/50 text-[#B3704D] border-2 border-[#D08860]'}
                hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
              `}
            >
              {type === 'Dog' ? <DogIcon /> : 
               type === 'Cat' ? <CatIcon /> : 
               <PawIcon />}
              <span>{type}</span>
            </button>
          ))}
        </div>
        
        {/* Pet grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <div 
                key={pet.id} 
                className="bg-white/80 rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
              >
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  className="w-full h-110 object-cover object-top"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = pet.type === 'Dog' ? Dog2 : Cat1;
                  }}
                />
                {pet.status && pet.status !== 'Available' && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs">
                    {pet.status}
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-[#B3704D]">
                      {pet.name}
                    </h2>
                    <PetTypeIcon type={pet.type} />
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <p>{pet.breed} • {pet.age} years old • {pet.gender}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{pet.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pet.vaccinated && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vaccinated</span>
                    )}
                    {pet.neutered && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Neutered</span>
                    )}
                    {pet.specialNeeds && (
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Special Needs</span>
                    )}
                  </div>
                  <button 
                    onClick={() => handleAdoptClick(pet)}
                    className="w-full bg-gradient-to-r from-[#D08860] to-[#B3704D] text-white py-3 rounded-full 
                             hover:shadow-xl transition-all duration-300 
                             flex items-center justify-center space-x-2"
                  >
                    <PawIcon />
                    <span>Adopt Me</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No pets found in this category.
            </div>
          )}
        </div>
        
        {/* Pet Count */}
        <div className="text-center mt-6 text-gray-600">
          Total Pets: {filteredPets.length} / {pets.length}
        </div>
      </div>
    </div>
  );
};

export default AdoptablePetList;