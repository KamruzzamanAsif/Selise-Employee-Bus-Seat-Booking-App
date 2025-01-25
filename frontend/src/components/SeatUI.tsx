import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeatUI = () => {
  // Define the seats as per the layout
  const initialSeats = [
    'A1', 'A2', 'A3',
    'B1', 'B2', 'B3',
    'C1', 'C2', 'C3',
    'D1', 'D2', 'D3',
    'E1', 'E2', 'E3',
  ];

  // List of buses
  const buses = [
    { id: 'S098', number: 'Bus S098' },
    { id: 'S099', number: 'Bus S099' },
    { id: 'S100', number: 'Bus S100' },
  ];

  // State to track booked seats
  const [bookedSeats, setBookedSeats] = useState<Record<string, boolean>>({});
  const [selectedBus, setSelectedBus] = useState<string>(buses[0].id); // Default to the first bus
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null); // Track selected seat for details
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Track if in admin mode
  const [isLoading, setIsLoading] = useState<boolean>(false); // Track loading state

  // Form state for modal
  const [name, setName] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false); // Track if in edit mode

  const navigate = useNavigate();
  const location = useLocation();

  // Load booked seats from localStorage on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const bus = queryParams.get('bus') || buses[0].id;
    const admin = queryParams.get('admin') === 'true';

    setSelectedBus(bus);
    setIsAdmin(admin);

    setIsLoading(true);
    const storedBookedSeats = JSON.parse(localStorage.getItem(`bookedSeats-${bus}`) || '{}');
    if (storedBookedSeats) {
      setBookedSeats(storedBookedSeats);
    }
    setIsLoading(false);
  }, [location.search]);

  // Handle seat click
  const handleSeatClick = (seat: string) => {
    if (isAdmin) {
      // In admin mode, show seat details
      setSelectedSeat(seat);
      const bookingDetails = getBookingDetails(seat);
      setName(bookingDetails.name || '');
      setDestination(bookingDetails.destination || '');
      setTime(bookingDetails.time || '');
      setIsEditMode(false); // Reset edit mode when a new seat is selected
    } else if (bookedSeats[seat]) {
      toast.error(`Seat ${seat} is already booked.`, {
        position: "top-center", // Center the toast
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { fontSize: '16px', width: '400px' }, // Make the toast bigger
      });
    } else {
      navigate('/book-seat', { state: { seatNumber: seat, busNumber: selectedBus } });
    }
  };

  // Handle bus selection
  const handleBusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const busId = e.target.value;
    setSelectedBus(busId);

    // Update URL to reflect the selected bus
    navigate(`?bus=${busId}${isAdmin ? '&admin=true' : ''}`);
  };

  // Close seat details modal
  const closeModal = () => {
    setSelectedSeat(null);
    setName('');
    setDestination('');
    setTime('');
    setIsEditMode(false); // Reset edit mode when modal is closed
  };

  // Get booking details for the selected seat
  const getBookingDetails = (seat: string) => {
    return JSON.parse(localStorage.getItem(`seat-${seat}-${selectedBus}`) || '{}');
  };

  // Handle form submission in modal
  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !destination || !time) {
      toast.error('Please fill out all fields.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { fontSize: '16px', width: '400px' },
      });
      return;
    }

    // Save booking details to local storage
    const bookingDetails = {
      name,
      seatNumber: selectedSeat,
      busNumber: selectedBus,
      destination,
      time,
    };
    localStorage.setItem(`seat-${selectedSeat}-${selectedBus}`, JSON.stringify(bookingDetails));

    // Update booked seats in local storage
    const updatedBookedSeats = { ...bookedSeats, [selectedSeat!]: true };
    localStorage.setItem(`bookedSeats-${selectedBus}`, JSON.stringify(updatedBookedSeats));
    setBookedSeats(updatedBookedSeats);

    // Show success toast
    toast.success(`Seat ${selectedSeat} updated successfully!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: { fontSize: '16px', width: '400px' },
    });

    // Close the modal
    closeModal();
  };

  const handleAdminLogin = () => {
    navigate(`/admin`);
  };

  const handleExitAdminMode = () => {
    navigate('/');
  };

  return (
    <div className="p-4 flex flex-col items-center bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen pt-11"
    style={{
        transform: 'scale(0.75)', // Scale to 75%
        transformOrigin: 'top left', // Set the origin point for scaling
        width: '133.33%', // Compensate for the reduced scale to keep the layout proportional
        height: '133.33%',
        paddingLeft: '5rem',
      }}>
      {/* Container with 75% viewport width */}
      <div className="max-w-full  p-5 justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚌 Seat Reservation System
            </h1>
          </div>
          <div className="mt-4 text-2xl font-bold text-red-600">
            ⏳ Hurry! Only few seats left!
          </div>
        </div>

        {/* Admin Mode Indicator */}
        {isAdmin && (
          <div className="mb-4 p-3 bg-blue-100 rounded-lg flex items-center justify-between w-full max-w-2xl">
            <span className="text-blue-700 font-semibold">Admin Mode Activated</span>
            <button
              onClick={handleExitAdminMode}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Exit Admin Mode
            </button>
          </div>
        )}

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
        <div className="mb-6 w-80 max-w-md">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Select a Bus:
            </span>
            <div className="relative flex-1">
              <select
                value={selectedBus}
                onChange={handleBusSelect}
                className="mt-1 block w-full p-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white hover:bg-gray-50"
              >
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {bus.number}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">🚌</span>
              </div>
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
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="border-2 border-gray-300 rounded-lg p-6 shadow-lg bg-white max-w-2xl w-80">
            {/* Driver Section */}
            <div className="mb-8 flex justify-end rounded-full">
              <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full">
                <span className="text-lg font-bold">Driver</span>
              </div>
            </div>

            {/* Seats Grid with Aisle */}
            <div className="flex gap-12 justify-center">
              {/* Left Column (A1, B1, C1, etc.) */}
              <div className="flex flex-col gap-4">
                {initialSeats
                  .filter((seat) => seat.endsWith('1')) // Filter seats ending with '1'
                  .map((seat) => (
                    <button
                      key={seat}
                      className={`w-16 h-16 flex items-center justify-center rounded-lg ${
                        bookedSeats[seat] ? 'bg-gray-500' : 'bg-blue-500'
                      } text-white font-bold hover:bg-blue-600 transition-all`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat}
                    </button>
                  ))}
              </div>

              {/* Right Columns (A2, A3, B2, B3, etc.) */}
              <div className="grid grid-cols-2 gap-4">
                {initialSeats
                  .filter((seat) => !seat.endsWith('1')) // Filter seats not ending with '1'
                  .map((seat) => (
                    <button
                      key={seat}
                      className={`w-16 h-16 flex items-center justify-center rounded-lg ${
                        bookedSeats[seat] ? 'bg-gray-500' : 'bg-blue-500'
                      } text-white font-bold hover:bg-blue-600 transition-all`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {seat}
                    </button>
                  ))}
              </div>
            </div>

            {/* Bus Number at the Bottom */}
            <div className="mt-8 text-center">
              <span className="text-xl font-bold text-gray-700">BUS NO. {selectedBus}</span>
            </div>
          </div>
        )}

        {/* Admin Login Button */}
        {!isAdmin && (
          <button
            onClick={handleAdminLogin}
            className="m-8 p-3 w-60 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold text-lg transition-all"
          >
            Admin Login
          </button>
        )}

        {/* Seat Details Modal (Admin Mode) */}
        {isAdmin && selectedSeat && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Seat Details for {selectedSeat}</h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">NAME:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter passenger name"
                    readOnly={!isEditMode} // Read-only unless in edit mode
                  />
                </div>

                {/* Destination Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">SELECT DESTINATION:</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditMode} // Disabled unless in edit mode
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
                  <label className="block text-sm font-medium text-gray-700">SELECT TIME:</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isEditMode} // Disabled unless in edit mode
                  >
                    <option value="">Select Time</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!isEditMode ? (
                    <button
                      type="button"
                      onClick={() => setIsEditMode(true)}
                      className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditMode(false)}
                        className="w-full p-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full p-2 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-all"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatUI;