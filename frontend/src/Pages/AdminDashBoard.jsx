import React, { useState } from 'react';
import { 
  PawPrint, 
  CalendarCheck, 
  FileText, 
  Dog, 
  Cat, 
  Home, 
  User, 
  PlusCircle,
  HeartHandshake,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// Mock data (would typically come from a backend)
const initialPets = [
  { 
    id: 1, 
    name: 'Buddy', 
    type: 'Dog', 
    breed: 'Labrador', 
    age: 3, 
    status: 'Available',
    image: '/api/placeholder/200/200?text=Buddy'
  },
  { 
    id: 2, 
    name: 'Whiskers', 
    type: 'Cat', 
    breed: 'Siamese', 
    age: 2, 
    status: 'Pending Adoption',
    image: '/api/placeholder/200/200?text=Whiskers'
  },
  { 
    id: 3, 
    name: 'Luna', 
    type: 'Dog', 
    breed: 'Poodle', 
    age: 5, 
    status: 'Available',
    image: '/api/placeholder/200/200?text=Luna'
  }
];

const initialVisits = [
  {
    id: 1,
    petName: 'Buddy',
    adopterName: 'John Doe',
    date: '2024-04-15',
    time: '14:00',
    status: 'Scheduled'
  },
  {
    id: 2,
    petName: 'Whiskers',
    adopterName: 'Jane Smith',
    date: '2024-04-20',
    time: '10:30',
    status: 'Completed'
  }
];

const PetAdoptionDashboard = () => {
  const [pets, setPets] = useState(initialPets);
  const [homeVisits, setHomeVisits] = useState(initialVisits);
  const [activeSection, setActiveSection] = useState('pets');

  const renderPetList = () => (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
          <Dog className="mr-3 text-gray-600" /> Adoptable Pets
        </h2>
        <button 
          className="flex items-center bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <PlusCircle className="mr-2" /> Add New Pet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <div 
            key={pet.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-semibold 
                  ${pet.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'}
                `}>
                  {pet.status}
                </span>
              </div>
              <div className="text-gray-600">
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age} years</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
                  View Details
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHomeVisits = () => (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center">
          <CalendarCheck className="mr-3 text-gray-600" /> Home Visits
        </h2>
        <button 
          className="flex items-center bg-gradient-to-r from-gray-500 to-gray-700 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <PlusCircle className="mr-2" /> Schedule Visit
        </button>
      </div>
      <div className="space-y-4">
        {homeVisits.map(visit => (
          <div 
            key={visit.id} 
            className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Home className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{visit.petName} Adoption</h3>
                <p className="text-gray-600">
                  Adopter: {visit.adopterName} | {visit.date} at {visit.time}
                </p>
              </div>
            </div>
            <span className={`
              px-3 py-1 rounded-full text-sm font-semibold 
              ${visit.status === 'Scheduled' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'}
            `}>
              {visit.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
        <FileText className="mr-3 text-gray-600" /> Adoption Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 transform transition-all hover:scale-105">
          <div className="flex justify-between items-center">
            <HeartHandshake className="text-gray-500" size={40} />
            <span className="text-3xl font-bold text-gray-700">
              {pets.length}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Total Pets</h3>
          <div className="h-2 w-full bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-gray-500 rounded-full" 
              style={{
                width: `${(pets.length / 10) * 100}%`
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 transform transition-all hover:scale-105">
          <div className="flex justify-between items-center">
            <CheckCircle2 className="text-green-500" size={40} />
            <span className="text-3xl font-bold text-green-700">
              {pets.filter(p => p.status === 'Available').length}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Available Pets</h3>
          <div className="h-2 w-full bg-green-100 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full" 
              style={{
                width: `${(pets.filter(p => p.status === 'Available').length / pets.length) * 100}%`
              }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 transform transition-all hover:scale-105">
          <div className="flex justify-between items-center">
            <Clock className="text-blue-500" size={40} />
            <span className="text-3xl font-bold text-blue-700">
              {homeVisits.filter(v => v.status === 'Scheduled').length}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Scheduled Visits</h3>
          <div className="h-2 w-full bg-blue-100 rounded-full">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{
                width: `${(homeVisits.filter(v => v.status === 'Scheduled').length / homeVisits.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl">
        <div className="p-6 border-b border-white/20 flex items-center">
          <PawPrint className="mr-3 text-white" size={40} />
          <h1 className="text-2xl font-bold text-white">Pawsome Adoptions</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { 
                name: 'Pets', 
                icon: Dog, 
                section: 'pets',
                color: 'hover:bg-gray-600' 
              },
              { 
                name: 'Home Visits', 
                icon: CalendarCheck, 
                section: 'visits',
                color: 'hover:bg-gray-600' 
              },
              { 
                name: 'Reports', 
                icon: FileText, 
                section: 'reports',
                color: 'hover:bg-gray-600' 
              }
            ].map(item => (
              <li 
                key={item.section}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer 
                  ${activeSection === item.section 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 ' + item.color}
                  transition-all duration-300
                `}
                onClick={() => setActiveSection(item.section)}
              >
                <item.icon className="mr-3" />
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeSection === 'pets' && renderPetList()}
        {activeSection === 'visits' && renderHomeVisits()}
        {activeSection === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default PetAdoptionDashboard;