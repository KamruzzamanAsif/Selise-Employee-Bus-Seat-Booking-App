import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeatUI from './components/SeatUI';
import AdminPanel from './components/AdminPanel';
import SeatBookingForm from './components/SeatBookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeatUI />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/book-seat" element={<SeatBookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;