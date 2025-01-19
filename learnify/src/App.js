import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './components/Common/Navbar';
import ForgotPassword from './Pages/ForgotPassword';
import OpenRoute from './components/core/Auth/OpenRoute';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyEmail from './Pages/VerifyEmail';
import Contact from './Pages/Contact';


function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar></Navbar>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />

        <Route path="signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword /> </OpenRoute>} />
        <Route path="verify-email" element={<OpenRoute><VerifyEmail /> </OpenRoute>} />

      </Routes>



    </div>
  );
}

export default App;
