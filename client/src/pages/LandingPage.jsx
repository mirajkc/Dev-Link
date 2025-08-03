import React from 'react';
import { useAppContext } from '../context/appContext';
import round_logo from '../assets/round_logo.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const textBaseClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bgBaseClass = theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100';
  const cardBgClass = theme === 'dark' ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50' : 'bg-white/80 backdrop-blur-sm border border-gray-200/50';
  const btnPrimaryClass = theme === 'dark' 
    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25' 
    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25';
  const btnSecondaryClass = theme === 'dark' 
    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/25' 
    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/25';

  return (
    <div className={`${bgBaseClass} min-h-screen transition-all duration-500 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 ${theme === 'dark' ? 'bg-green-500' : 'bg-green-300'}`} />
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Header & Logo */}
        <header className="flex items-center justify-between max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 cursor-pointer group transition-transform hover:scale-105" onClick={() => navigate('/home')}>
            <div className="relative">
              <img src={round_logo} alt="DevLink Logo" className="w-14 h-14 rounded-full shadow-xl group-hover:shadow-2xl transition-shadow duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className={`text-3xl font-extrabold select-none transition-colors duration-300 ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
              DevLink
            </h1>
          </div>
          <nav className="flex gap-8 text-sm font-semibold">
            {['Home','About','Login'].map((item) => (
              <button 
                key={item}
                className={`${textBaseClass} hover:text-blue-500 transition-all duration-300 relative group`} 
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center mb-24">
          <div>
            <h2 className={`text-5xl sm:text-7xl font-bold mb-8 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Empowering Developers to
              <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent block mt-2">
                Build & Connect
              </span>
            </h2>
            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 ${textBaseClass}`}>
              Showcase your portfolio, share your projects, and join a thriving community of developers around the world.
              Socialize, collaborate, and grow your network.
            </p>
            <button
              onClick={() => {navigate('/home'); 
                scrollTo(0,0)
              }}
              className={`px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${btnPrimaryClass}`}
            >
              Explore The DevLink Now
              <span className="ml-2">🚀</span>
            </button>
          </div>
        </section>

        {/* About Us */}
        <section className={`max-w-5xl mx-auto mb-32 p-10 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl ${cardBgClass}`}>
          <h3 className={`text-4xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            About DevLink
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className={`${textBaseClass} text-lg mb-6 leading-relaxed`}>
                DevLink is a full-stack web platform dedicated to developers. Our mission is to empower
                developers by providing an easy-to-use space to build personalized portfolios, showcase
                their work, and engage with peers through social features.
              </p>
              <p className={`${textBaseClass} text-lg leading-relaxed`}>
                Whether you're a beginner looking to make your mark or a seasoned professional expanding your reach,
                DevLink is your launchpad to career growth and community collaboration.
              </p>
            </div>
            <div className="relative">
              <div className={`w-full h-64 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/50 to-green-900/50' : 'bg-gradient-to-br from-blue-100 to-green-100'} flex items-center justify-center`}>
                <div className="text-8xl opacity-50">💻</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto mb-32">
          <h3 className={`text-4xl font-bold mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                desc: 'Fill in your skills, experience, and personal info to craft a compelling developer portfolio.',
                icon: '📝',
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '2',
                title: 'Showcase Projects',
                desc: 'Upload projects with descriptions, links, and images to highlight your work.',
                icon: '💻',
                color: 'from-green-500 to-green-600'
              },
              {
                step: '3',
                title: 'Connect & Network',
                desc: 'Follow other developers, leave comments, and join discussions to grow your network.',
                icon: '🤝',
                color: 'from-purple-500 to-purple-600'
              },
              {
                step: '4',
                title: 'Get Discovered',
                desc: "Use DevLink's search and recommendation tools to get noticed by potential employers and collaborators.",
                icon: '🚀',
                color: 'from-orange-500 to-orange-600'
              },
            ].map(({ step, title, desc, icon, color }) => (
              <div
                key={step}
                className={`group p-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-800/90 hover:bg-gray-700/90' : 'bg-white/90 hover:bg-gray-50/90'
                } backdrop-blur-sm border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-2xl shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white font-bold text-sm`}>
                    {step}
                  </div>
                </div>
                <h4 className={`font-bold mb-4 text-xl text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </h4>
                <p className={`${textBaseClass} text-center leading-relaxed`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={`max-w-5xl mx-auto mb-32 p-10 rounded-3xl shadow-2xl ${cardBgClass}`}>
          <h3 className={`text-4xl font-bold mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Why Choose DevLink?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              'Professional portfolio builder.',
              'Robust social features including follows, likes, and comments.',
              'Secure and reliable platform with admin moderation.',
              'Opportunities to showcase projects and gain feedback.',
              'Regular updates and community-driven improvements.',
              'Responsive design for all devices.',
              'Built by developers, for developers.',
            ].map((reason, idx) => (
              <div
                key={idx}
                className={`group flex items-center gap-4 p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700/80' : 'bg-gray-100/50 hover:bg-gray-200/80'
                } backdrop-blur-sm`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <span className={`${textBaseClass} font-medium`}>{reason}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto mb-32">
          <h3 className={`text-4xl font-bold mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            What Developers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alice Johnson',
                role: 'Frontend Developer',
                quote: 'DevLink helped me showcase my projects professionally and connect with amazing developers worldwide.',
                avatar: '👩‍💻'
              },
              {
                name: 'Mark Lee',
                role: 'Full-Stack Engineer',
                quote: 'The social features make it easy to network and get valuable feedback. Highly recommended!',
                avatar: '👨‍💻'
              },
              {
                name: 'Sophia Patel',
                role: 'Backend Developer',
                quote: 'Building my portfolio on DevLink boosted my job prospects tremendously.',
                avatar: '👩‍🔬'
              },
            ].map(({ name, role, quote, avatar }, idx) => (
              <div
                key={idx}
                className={`group p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
                } backdrop-blur-sm border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}`}
              >
                <div className="text-4xl mb-4 text-center">{avatar}</div>
                <p className={`${textBaseClass} italic mb-6 text-lg leading-relaxed`}>"{quote}"</p>
                <div className="text-center">
                  <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {name}
                  </h4>
                  <p className={`text-sm ${textBaseClass} font-medium`}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className={`max-w-4xl mx-auto mb-32 p-10 rounded-3xl shadow-2xl ${cardBgClass}`}>
          <h3 className={`text-4xl font-bold mb-16 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h3>
          <div className="space-y-8">
            {[
              {
                q: 'Is DevLink free to use?',
                a: 'Yes, you can create your portfolio and connect with developers completely free.',
              },
              {
                q: 'Can I showcase  projects?',
                a: 'Yes you can showcase projects after updating the project information settings'
              },
              {
                q: 'How secure is the platform?',
                a: 'DevLink uses industry-standard security protocols and admin moderation to ensure safety.',
              },
              {
                q: 'Can I connect with developers worldwide?',
                a: 'Absolutely! The platform is designed to foster global collaboration.',
              },
            ].map(({ q, a }, idx) => (
              <div key={idx} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100/50'} backdrop-blur-sm`}>
                <h4 className={`font-bold mb-3 text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {q}
                </h4>
                <p className={`${textBaseClass} leading-relaxed`}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <div className={`p-12 rounded-3xl shadow-2xl ${cardBgClass}`}>
            <h3 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Build Your Developer Portfolio?
            </h3>
            <p className={`${textBaseClass} mb-10 text-xl leading-relaxed`}>
              Join hundreds of developers who trust DevLink to showcase their skills and grow their network.
            </p>
            <button
              onClick={() => {
                navigate('/home');
                scrollTo(0,0)
              }}
              className={`px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${btnSecondaryClass}`}
            >
              Get Started Now
              <span className="ml-2">✨</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;