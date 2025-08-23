import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path='/book/:roomid' exact Component={BookingScreen }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
