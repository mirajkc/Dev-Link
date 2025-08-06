import React from 'react'
import ThemeToggle from './components/ThemeToggle.jsx'
import { useAppContext } from './context/appContext'
import { Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Footer from './components/Footer.jsx'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Setting from './pages/Setting.jsx'
import { Toaster } from 'react-hot-toast'
import Project from './pages/Project.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Developers from './pages/Developers.jsx'
import Admin from './pages/admin/Admin.jsx'
import { useAdminContext } from './context/adminAppContext.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import Search from './pages/Search.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Community from './pages/Community.jsx'
import SingleCommunityPost from './pages/SingleCommunityPost.jsx'

const App = () => {
  const {theme, setTheme} = useAppContext();
  const {adminLoginValue} = useAdminContext()
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/settings' element={<Setting />} />
        <Route path='/projects' element={<Project />} />
        <Route path='/profile/:id' element={<MyProfile />} />
        <Route path='/developers' element={<Developers />} />
        <Route path='/admin' element={adminLoginValue ? <Admin /> : <AdminLogin />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/community' element = { <Community />} />
        <Route path='/community/post/:id' element = {<SingleCommunityPost />} />
      </Routes>
      <ThemeToggle />
      <Footer />
       <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            
            fontSize: '14px',
          },
        }}
      />
    </div>
  )
}

export default App
