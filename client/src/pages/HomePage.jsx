import React from 'react'
import { useAppContext } from '../context/appContext'
import HeroSection from '../components/HomePage/HeroSection';
import HowItWorksSection from '../components/HomePage/HowItWorksSection';
import FindUsers from '../components/HomePage/FindUsers.jsx';
import FindProject from '../components/HomePage/FindProject.jsx';
import Testimonial from '../components/HomePage/Testimonial ';
import CallToActionFooter from '../components/HomePage/CallToActionFooter';
import NewsLetter from '../components/HomePage/NewsLetter';

const HomePage = () => {
  const {theme,naivgate} = useAppContext();
  return (
   <div>
    <HeroSection />
    <HowItWorksSection />
    <FindUsers />
    <FindProject />
    <Testimonial />
    <CallToActionFooter />
    <NewsLetter />
   </div>
  )
}

export default HomePage
