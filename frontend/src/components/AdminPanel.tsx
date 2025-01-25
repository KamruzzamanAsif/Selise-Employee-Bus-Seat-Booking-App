import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  // List of buses
  const buses = [
    { id: 'S098', number: 'Bus S098' },
    { id: 'S099', number: 'Bus S099' },
    { id: 'S100', number: 'Bus S100' },
  ];

  // State to track selected bus
  const [selectedBus, setSelectedBus] = useState<string>(buses[0].id);

  const navigate = useNavigate();

  // Handle bus selection
  const handleBusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBus(e.target.value);
  };

  // Handle "See Details" button click
  const handleSeeDetails = () => {
    navigate(`/?bus=${selectedBus}&admin=true`);
  };

  // Handle "Go Back to Seat UI" button click
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚌 Admin Panel
        </h1>

        {/* Toast Container */}
        <ToastContainer
          position="top-center" // Center all toasts
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: '400px', fontSize: '16px' }} // Make all toasts bigger
        />

        {/* Bus Selection Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">SELECT BUS:</label>
          <div className="relative">
            <select
              value={selectedBus}
              onChange={handleBusSelect}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white hover:bg-gray-50"
            >
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.number}
                </option>
              ))}
            </select>
            {/* Bus Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">🚌</span>
            </div>
            {/* Dropdown Arrow Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* See Details Button */}
        <button
          onClick={handleSeeDetails}
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 mb-4"
        >
          See Details for Bus No. {selectedBus}
        </button>

        {/* Go Back to Seat UI Button */}
        <button
          onClick={handleGoBack}
          className="w-full p-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95"
        >
          Go Back to Seat UI
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;