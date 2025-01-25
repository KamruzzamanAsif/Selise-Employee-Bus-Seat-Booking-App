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
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">ADMIN PANEL</h1>

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
          <select
            value={selectedBus}
            onChange={handleBusSelect}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.number}
              </option>
            ))}
          </select>
        </div>

        {/* See Details Button */}
        <button
          onClick={handleSeeDetails}
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all mb-4"
        >
          See Details for Bus No. {selectedBus}
        </button>

        {/* Go Back to Seat UI Button */}
        <button
          onClick={handleGoBack}
          className="w-full p-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
        >
          Go Back to Seat UI
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;