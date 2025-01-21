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
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from "./Pages/Dashboard"
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from "./Pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./Utils/constant";
import { useSelector } from 'react-redux';
import Cart from "./components/core/Dashboard/Cart"
import AddCourse from "./components/core/Dashboard/AddCourse"






function App() {

  const { user } = useSelector((state) => state.profile)

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

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />

           <Route path="dashboard/Settings" element={<Settings />} />


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                {/* <Route path="dashboard/instructor" element={<Instructor />} /> */}
                <Route path="dashboard/add-course" element={<AddCourse />} />
                {/* <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
                {/* <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} /> */}

              </>
            )
          } 


        </Route>

        <Route path="*" element={<Error />} />

      </Routes>



    </div>
  );
}

export default App;
