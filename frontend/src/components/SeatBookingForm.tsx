import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookingDetails {
  name: string;
  seatNumber: string;
  busNumber: string;
  destination: string;
  time: string;
}

const SeatBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seatNumber, busNumber } = location.state || { seatNumber: 'N/A', busNumber: 'N/A' };

  const [name, setName] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !destination || !time) {
      toast.error('Please fill out all fields.', {
        position: "top-center", // Center the toast
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { fontSize: '16px', width: '400px' }, // Make the toast bigger
      });
      return;
    }

    setIsLoading(true); // Start loading

    // Simulate a delay for the booking process
    setTimeout(() => {
      // Save booking details to local storage
      const bookingDetails: BookingDetails = {
        name,
        seatNumber,
        busNumber,
        destination,
        time,
      };
      localStorage.setItem(`seat-${seatNumber}-${busNumber}`, JSON.stringify(bookingDetails));

      // Update booked seats in local storage
      const bookedSeats = JSON.parse(localStorage.getItem(`bookedSeats-${busNumber}`) || '{}');
      bookedSeats[seatNumber] = true;
      localStorage.setItem(`bookedSeats-${busNumber}`, JSON.stringify(bookedSeats));

      // Show success toast
      toast.success(
        <div>
          <p>Seat {seatNumber} booked for {name} on bus {busNumber} to {destination} at {time}.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Go Back to Seat UI
          </button>
        </div>,
        {
          position: "top-center", // Center the toast
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          style: { fontSize: '16px', width: '400px' }, // Make the toast bigger
        }
      );

      setIsLoading(false); // Stop loading

      // Delay navigation to allow the toast to be seen
      setTimeout(() => {
        navigate('/');
      }, 5000); // Wait for 5 seconds before navigating
    }, 2000); // Simulate a 2-second delay
  };

  // Handle "Go Back to Seat UI" button click
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">SEAT BOOKING FORM</h1>

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

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">NAME:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Bus Number (Read-Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">BUS NO:</label>
            <input
              type="text"
              value={busNumber}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Seat Number (Read-Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SEAT NO:</label>
            <input
              type="text"
              value={seatNumber}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SELECT DESTINATION:</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select Destination</option>
              <option value="Mirpur 11">Mirpur 11</option>
              <option value="Uttara">Uttara</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Dhanmondi">Dhanmondi</option>
            </select>
          </div>

          {/* Time Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SELECT TIME:</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select Time</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : (
              'BOOK SEAT'
            )}
          </button>
        </form>

        {/* Go Back to Seat UI Button */}
        <button
          onClick={handleGoBack}
          className="w-full mt-4 p-3 bg-red-400 text-white rounded-lg font-bold hover:bg-red-500 transition-all"
        >
          Go Back to Seat UI
        </button>
      </div>
    </div>
  );
};

export default SeatBookingForm;