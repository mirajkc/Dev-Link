import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { useAppContext } from '../context/appContext';

const AboutUs = () => {
  const { theme } = useAppContext();
  const [activeSection, setActiveSection] = useState('contact-us');

  const sections = [
    { id: 'contact-us', title: 'Contact Us', icon: MessageCircle },
    { id: 'faqs', title: 'FAQs', icon: HelpCircle },
  ];

  const commonCardStyle = `rounded-lg shadow-sm border p-6 transition duration-300 ${
    theme === 'dark'
      ? 'bg-gray-900 border-gray-700 text-white'
      : 'bg-white border-gray-200 text-gray-900'
  }`;

  const textStyle = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextStyle = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}>
      {/* Nav */}
      <nav
        className={`border-b sticky top-0 z-10 shadow-sm ${
          theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-4">
          <div className="flex flex-wrap gap-1 justify-center md:justify-start">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {section.title}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        {/* Contact Us */}
        {activeSection === 'contact-us' && (
          <section className="space-y-10">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${textStyle}`}>Contact Us</h2>
              <p className={`text-lg max-w-2xl mx-auto ${subTextStyle}`}>
                Whether you have a question, feedback, or just want to say hello, we’re here for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={commonCardStyle}>
                <Mail className="mb-4 text-blue-600" size={24} />
                <h4 className="font-semibold mb-2">Customer Support</h4>
                <p className={subTextStyle}>support@devlink.com</p>
              </div>

              <div className={commonCardStyle}>
                <Phone className="mb-4 text-blue-600" size={24} />
                <h4 className="font-semibold mb-2">Helpline</h4>
                <p className={subTextStyle}>+977-9800000000</p>
                <p className="text-sm text-gray-500 mt-1">9 AM – 9 PM daily</p>
              </div>

              <div className={commonCardStyle}>
                <Clock className="mb-4 text-blue-600" size={24} />
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className={subTextStyle}>Available during business hours</p>
              </div>

              <div className={commonCardStyle}>
                <Mail className="mb-4 text-blue-600" size={24} />
                <h4 className="font-semibold mb-2">Business Inquiries</h4>
                <p className={subTextStyle}>business@devlink.com</p>
              </div>

              <div className={`${commonCardStyle} md:col-span-2`}>
                <MapPin className="mb-4 text-blue-600" size={24} />
                <h4 className="font-semibold mb-2">Address</h4>
                <p className={subTextStyle}>123 Default Street, Kathmandu, Nepal</p>
              </div>
            </div>

            <div
              className={`rounded-lg p-6 border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-green-500 text-white'
                  : 'bg-black border-green-200 text-white'
              }`}
            >
              <p>
                You can also reach out to us through our social media handles. We typically respond
                within a few hours.
              </p>
            </div>
          </section>
        )}

        {/* FAQs */}
        {activeSection === 'faqs' && (
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold mb-4 ${textStyle}`}>Frequently Asked Questions</h2>
              <p className={`text-lg ${subTextStyle}`}>
                Answers to questions we often get asked.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'What is DevLink?',
                  a: 'DevLink is a platform for developers to connect, showcase their work, and collaborate.',
                },
                {
                  q: 'Can I contribute to DevLink?',
                  a: 'Yes! We encourage user-generated content and developer communities.',
                },
                {
                  q: 'How do I report a bug or issue?',
                  a: 'Email us directly at support@devlink.com with details and screenshots.',
                },
              ].map((faq, idx) => (
                <div key={idx} className={commonCardStyle}>
                  <h4 className="text-lg font-semibold mb-3">{faq.q}</h4>
                  <p className={subTextStyle}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
