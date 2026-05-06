import './App.css';
import Navbar from './components/Navbar';
import UtilityBar from './components/UtilityBar';
import CategoryNavbar from './components/CategoryNavbar';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import BookingScreen from './screens/BookingScreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import AboutScreen from './screens/AboutScreen';
import OwnerLoginScreen from './screens/OwnerLoginScreen';

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/';

  return (
    <>
      <UtilityBar />
      <Navbar />
      {isHomePage && <CategoryNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/owner-login" element={<OwnerLoginScreen />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
