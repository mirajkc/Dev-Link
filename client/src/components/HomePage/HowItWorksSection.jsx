import React from 'react'
import {
  LogIn,
  UploadCloud,
  Users,
  MessageCircleMore
} from 'lucide-react';
import { useAppContext } from '../../context/appContext';

const HowItWorksSection = () => {

  const {theme} = useAppContext();

  const steps = [
    {
      title: 'Sign Up or Log In',
      desc: 'Create your DevLink account and personalize your profile.',
      icon: <LogIn size={32} className="text-indigo-500" />
    },
    {
      title: 'Upload & Manage Projects',
      desc: 'Showcase your work by uploading and managing your projects.',
      icon: <UploadCloud size={32} className="text-green-500" />
    },
    {
      title: 'Explore Developer Profiles',
      desc: 'View, like, or comment on other developers’ profiles and projects.',
      icon: <Users size={32} className="text-blue-500" />
    },
    {
      title: 'Join the Community',
      desc: 'Engage with other devs in the community space.',
      icon: <MessageCircleMore size={32} className="text-yellow-500" />
    }
  ];

  return (
    <div>
       <section className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} py-16 px-6`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">How DevLink Works</h2>
        <p className="mb-12 text-lg max-w-2xl mx-auto">
          DevLink helps developers connect, showcase their work, and build meaningful tech communities.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-xl shadow-md hover:scale-[1.02] transition`}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

export default HowItWorksSection
