import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
  Code,
  Brain,
  Award,
  BookOpen,
  Briefcase,
  User,
  Calendar,
  Globe,
  Zap,
  Shield,
  Home,
  Car,
  FileText,
  Download,
  Send
} from 'lucide-react';
import ProfileCard from './components/ProfileCard';
import CountUp from './components/CountUp';
import { ScrollReveal } from './components/ParallaxComponents';
import './components/ParallaxStyles.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'freelancing', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Send email via Resend API backend
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSubmitStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const skills = [
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Arduino', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
    { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  ];

  const projects = [
    {
      title: 'Object Detection for Visually Impaired',
      subtitle: 'MSME 2024',
      description: 'Designed a smart vision system using AI to detect objects and alert visually impaired users with real-time detection and user-friendly feedback mechanisms.',
      tech: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision'],
      highlights: [
        'Real-time object detection and classification',
        'Audio feedback system for accessibility',
        'Efficient model deployment for mobile devices'
      ]
    },
    {
      title: 'Autonomous Water Hyacinth Bot',
      subtitle: 'Smart India Hackathon 2023',
      description: 'Developed an autonomous robot to identify and chop water hyacinths, implementing machine learning for plant recognition and robotic controls.',
      tech: ['Python', 'Machine Learning', 'IoT', 'Robotics'],
      highlights: [
        'Plant recognition using computer vision',
        'Autonomous navigation system',
        'Environmental sustainability focus'
      ]
    }
  ];

  const freelancingProjects = {
    iot: [
      {
        title: 'Autonomous Fire Fighting Bot',
        description: 'Developed an intelligent fire detection and suppression robot using IoT sensors and automated control systems.',
        tech: ['Arduino', 'IoT Sensors', 'Python', 'Robotics'],
        highlights: [
          'Real-time fire detection using thermal sensors',
          'Automated water spraying mechanism',
          'Remote monitoring and control system'
        ]
      },
      {
        title: 'Smart Home Automation',
        description: 'Complete home automation solution with voice control, mobile app integration, and energy monitoring.',
        tech: ['ESP32', 'IoT', 'Mobile App', 'Voice Control'],
        highlights: [
          'Voice-controlled lighting and appliances',
          'Energy consumption monitoring',
          'Mobile app for remote control'
        ]
      },
      {
        title: 'Accident Detection System',
        description: 'IoT-based vehicle accident detection system with GPS tracking and emergency alert functionality.',
        tech: ['GPS Module', 'Accelerometer', 'GSM', 'IoT'],
        highlights: [
          'Real-time accident detection using sensors',
          'Automatic emergency alerts to contacts',
          'GPS location tracking and sharing'
        ]
      }
    ],
    web: [
      {
        title: 'Tourist Website for Travel Agency',
        subtitle: 'WeTreck India',
        description: 'Comprehensive travel booking platform with destination guides, package booking, and customer management.',
        tech: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
        highlights: [
          'Interactive destination exploration',
          'Secure payment integration',
          'Real-time booking management'
        ],
        status: 'Live',
        liveUrl: 'https://wetreckindia.netlify.app',
        image: '/wetreckindia_home.png'
      },
      {
        title: 'Professional Website for Glossix Pro',
        subtitle: 'E-Publishing Partner',
        description: 'Modern corporate website with portfolio showcase, service listings, and client management system.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'CMS'],
        highlights: [
          'Responsive design with modern UI/UX',
          'Content management system',
          'SEO optimization and performance'
        ],
        status: 'Live',
        liveUrl: 'http://www.glossixpro.com',
        image: '/glossixpro_home.png'
      }
    ]
  };

  const experiences = [
    {
      title: 'Django Framework Intern',
      company: 'Phoenix Softech',
      period: 'February 2024 – March 2024',
      type: 'internship',
      details: [
        'Developed and maintained web applications using Django framework',
        'Gained hands-on experience in backend development and database integration',
        'Improved understanding of MVC architecture and API creation'
      ]
    },
    {
      title: 'Angular Framework Intern',
      company: 'Amizth Infotech',
      period: 'June 2023 – July 2023',
      type: 'internship',
      details: [
        'Built dynamic and responsive user interfaces using Angular',
        'Learned component-based development for real-time frontend projects',
        'Strengthened skills in HTML, CSS, and JavaScript'
      ]
    }
  ];

  const certifications = [
    '3 Level IoT Certificate',
    'Ethical Hacking by NPTEL',
    'Angular Framework Internship',
    'Django Framework Internship'
  ];

  // Mouse-controlled Animated Background Component
  const MouseControlledBackground = () => {
    const { x, y } = mousePosition;

    // Calculate parallax offsets based on mouse position
    const parallaxX = (x - 0.5) * 100;
    const parallaxY = (y - 0.5) * 100;
    const parallaxXSlow = (x - 0.5) * 50;
    const parallaxYSlow = (y - 0.5) * 50;
    const parallaxXFast = (x - 0.5) * 150;
    const parallaxYFast = (y - 0.5) * 150;

    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
              rgba(59, 130, 246, 0.8) 0%, 
              rgba(37, 99, 235, 0.6) 25%, 
              rgba(29, 78, 216, 0.4) 50%, 
              rgba(13, 148, 136, 0.6) 75%, 
              rgba(15, 118, 110, 0.8) 100%)`
          }}
        />

        {/* Mouse-following Spotlight */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            transform: `translate(-50%, -50%) scale(${1 + (x + y) * 0.2})`
          }}
        />

        {/* Interactive Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => {
            const baseX = (i * 3.33) % 100;
            const baseY = (i * 7.77) % 100;
            const mouseInfluence = 20;
            const distance = Math.sqrt(Math.pow(x * 100 - baseX, 2) + Math.pow(y * 100 - baseY, 2));
            const influence = Math.max(0, 1 - distance / 50);

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full transition-all duration-500 ease-out"
                style={{
                  left: `${baseX + (x - 0.5) * mouseInfluence * influence}%`,
                  top: `${baseY + (y - 0.5) * mouseInfluence * influence}%`,
                  opacity: 0.3 + influence * 0.4,
                  transform: `scale(${0.5 + influence * 0.8})`,
                  boxShadow: `0 0 ${10 + influence * 20}px rgba(255, 255, 255, ${0.3 + influence * 0.4})`
                }}
              />
            );
          })}
        </div>

        {/* Mouse-responsive Orbs */}
        <div
          className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transition-all duration-700 ease-out"
          style={{
            left: `${20 + parallaxXSlow}px`,
            top: `${20 + parallaxYSlow}px`,
            transform: `scale(${1 + x * 0.3})`
          }}
        />
        <div
          className="absolute w-96 h-96 bg-teal-500/15 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            right: `${20 - parallaxX}px`,
            bottom: `${20 - parallaxY}px`,
            transform: `scale(${1 + y * 0.4})`
          }}
        />
        <div
          className="absolute w-48 h-48 bg-purple-500/20 rounded-full blur-3xl transition-all duration-500 ease-out"
          style={{
            left: `${60 + parallaxXFast}px`,
            top: `${50 + parallaxYFast}px`,
            transform: `scale(${0.8 + (x + y) * 0.3})`
          }}
        />

        {/* Interactive Geometric Shapes */}
        <div
          className="absolute w-6 h-6 border-2 border-white/30 transition-all duration-300"
          style={{
            right: `${80 - parallaxX * 0.5}px`,
            top: `${80 + parallaxY * 0.5}px`,
            transform: `rotate(${x * 180}deg) scale(${1 + y * 0.5})`,
            borderColor: `rgba(255, 255, 255, ${0.2 + x * 0.3})`
          }}
        />
        <div
          className="absolute w-8 h-8 border border-white/20 rounded-full transition-all duration-500"
          style={{
            left: `${120 + parallaxXSlow}px`,
            bottom: `${120 + parallaxYSlow}px`,
            transform: `scale(${0.8 + (x + y) * 0.4})`,
            borderColor: `rgba(255, 255, 255, ${0.1 + y * 0.3})`
          }}
        />
        <div
          className="absolute w-4 h-4 bg-white/20 rounded-full transition-all duration-400"
          style={{
            left: `${30 + parallaxXFast * 0.3}px`,
            top: `${40 + parallaxYFast * 0.3}px`,
            transform: `scale(${0.5 + x * 0.8})`,
            opacity: 0.2 + y * 0.4
          }}
        />

        {/* Dynamic Code Elements */}
        <div
          className="absolute text-white/20 text-sm font-mono transition-all duration-700"
          style={{
            right: `${40 - parallaxX * 0.3}px`,
            top: `${25 + parallaxY * 0.3}%`,
            opacity: 0.1 + x * 0.3,
            transform: `rotate(${(x - 0.5) * 10}deg)`
          }}
        >
          {'{ AI: "learning" }'}
        </div>
        <div
          className="absolute text-white/20 text-sm font-mono transition-all duration-500"
          style={{
            left: `${30 + parallaxXSlow * 0.4}px`,
            bottom: `${30 + parallaxYSlow * 0.4}%`,
            opacity: 0.1 + y * 0.3,
            transform: `rotate(${(y - 0.5) * -15}deg)`
          }}
        >
          {'<ML />'}
        </div>
        <div
          className="absolute text-white/20 text-xs font-mono transition-all duration-600"
          style={{
            right: `${25 - parallaxXFast * 0.2}px`,
            bottom: `${40 + parallaxYFast * 0.2}%`,
            opacity: 0.1 + (x + y) * 0.2,
            transform: `scale(${0.8 + x * 0.4})`
          }}
        >
          {'function() { innovate(); }'}
        </div>

        {/* Interactive Neural Network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Mouse-responsive connecting lines */}
          <g>
            <line
              x1={`${20 + parallaxX * 0.1}%`}
              y1={`${30 + parallaxY * 0.1}%`}
              x2={`${80 - parallaxX * 0.1}%`}
              y2={`${70 - parallaxY * 0.1}%`}
              stroke="white"
              strokeWidth="1"
              opacity={0.1 + x * 0.2}
              strokeDasharray="5,5"
            />
            <line
              x1={`${70 - parallaxXSlow * 0.1}%`}
              y1={`${20 + parallaxYSlow * 0.1}%`}
              x2={`${30 + parallaxXSlow * 0.1}%`}
              y2={`${80 - parallaxYSlow * 0.1}%`}
              stroke="white"
              strokeWidth="1"
              opacity={0.1 + y * 0.2}
              strokeDasharray="3,7"
            />
            <line
              x1={`${10 + parallaxXFast * 0.05}%`}
              y1={`${60 + parallaxYFast * 0.05}%`}
              x2={`${90 - parallaxXFast * 0.05}%`}
              y2={`${40 - parallaxYFast * 0.05}%`}
              stroke="white"
              strokeWidth="1"
              opacity={0.1 + (x + y) * 0.15}
              strokeDasharray="8,4"
            />
          </g>
        </svg>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-900">Abdur Rahman</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Freelancing', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-200 ${activeSection === item.toLowerCase()
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Mouse-Controlled Background */}
      <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden cursor-none">
        <MouseControlledBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent animate-text-shimmer">
              Abdur Rahman
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up">
              AI & Machine Learning Student | Freelance Developer
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
              Passionate Computer Science student specializing in Artificial Intelligence and Machine Learning.
              Building innovative solutions that bring real value to society through freelance projects and research.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="mailto:mmabdurrahman05@gmail.com"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
              title="Send Email"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/abdur-rahman-m-a1906636b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/AbdurRahman-05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <a
              href="/Abdur Rahman CV.pdf"
              download="Abdur Rahman CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-blue-500/30">
                👋 Introduction
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Passionate about building innovative solutions with AI & ML
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fadeLeft" delay={200} className="order-2 md:order-1">
              {/* About text with glassmorphism */}
              <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 mb-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  I am a passionate <span className="text-blue-400 font-semibold">Computer Science student</span> specializing in Artificial Intelligence and Machine Learning.
                  I have strong analytical thinking and a continuous drive to improve. I enjoy working on projects that
                  bring real value and always aim to deliver quality results.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  As a <span className="text-teal-400 font-semibold">freelance developer</span>, I work on diverse projects ranging from IoT solutions to modern web applications.
                  I believe in the power of technology to solve real-world problems and create positive impact through innovation.
                </p>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-50 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                      <CountUp end={3} duration={2000} suffix="+" />
                    </div>
                    <div className="text-gray-400 text-sm">Years of Study</div>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl opacity-50 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent mb-1">
                      <CountUp end={10} duration={2000} suffix="+" />
                    </div>
                    <div className="text-gray-400 text-sm">Projects Completed</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeRight" delay={300} className="order-1 md:order-2 flex justify-center">
              <ProfileCard
                avatarUrl="/profile.jpg"
                name="Abdur Rahman"
                title="AI & ML Student"
                handle="abdurrahman"
                status="Available for Projects"
                contactText="Contact Me"
                showUserInfo={true}
                behindGlowColor="rgba(59, 130, 246, 0.5)"
                innerGradient="linear-gradient(145deg, rgba(59, 130, 246, 0.3) 0%, rgba(13, 148, 136, 0.3) 100%)"
                onContactClick={() => scrollToSection('contact')}
              />
            </ScrollReveal>
          </div>

          {/* Certifications and Languages */}
          <ScrollReveal animation="fadeUp" delay={400}>
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {/* Certifications Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Certifications
                  </h3>
                  <ul className="space-y-4">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Languages Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition-opacity duration-500"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    Languages
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-white/5">
                      <span className="text-gray-300 font-medium">Tamil</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">Native</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-white/5">
                      <span className="text-gray-300 font-medium">English</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">Proficient</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-purple-500/30">
                💡 Technical Stack
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Skills & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Technologies I use to bring ideas to life
              </p>
            </div>
          </ScrollReveal>

          {/* Inverted Triangle Layout */}
          <div className="flex flex-col items-center gap-6">
            {/* Row 1: 5 skills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skills.slice(0, 5).map((skill, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:from-purple-900/50 group-hover:to-blue-900/50 transition-all duration-300">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 drop-shadow-lg transition-all duration-300"
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: 4 skills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skills.slice(5, 9).map((skill, index) => (
                <div
                  key={index + 5}
                  className="group relative"
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:from-blue-900/50 group-hover:to-teal-900/50 transition-all duration-300">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 drop-shadow-lg transition-all duration-300"
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3: 3 skills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skills.slice(9, 12).map((skill, index) => (
                <div
                  key={index + 9}
                  className="group relative"
                  style={{ animationDelay: `${(index + 9) * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:from-teal-900/50 group-hover:to-green-900/50 transition-all duration-300">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 drop-shadow-lg transition-all duration-300"
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 4: 2 skills */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {skills.slice(12, 14).map((skill, index) => (
                <div
                  key={index + 12}
                  className="group relative"
                  style={{ animationDelay: `${(index + 12) * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:from-pink-900/50 group-hover:to-purple-900/50 transition-all duration-300">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 drop-shadow-lg transition-all duration-300"
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 5: 1 skill */}
            <div className="flex justify-center">
              {skills.slice(14, 15).map((skill, index) => (
                <div
                  key={index + 14}
                  className="group relative"
                  style={{ animationDelay: `${(index + 14) * 100}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500"></div>

                  <div className="relative flex flex-col items-center p-4 bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center group-hover:from-yellow-900/50 group-hover:to-orange-900/50 transition-all duration-300">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 drop-shadow-lg transition-all duration-300"
                      />
                    </div>
                    <span className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-blue-500/30">
                🚀 Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Featured <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Innovative solutions combining AI, IoT, and modern web technologies
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index} animation="scaleIn" delay={index * 150}>
                <div className="group relative h-full">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 rounded-2xl opacity-30 group-hover:opacity-100 blur group-hover:blur-sm transition-all duration-500"></div>

                  {/* Card content */}
                  <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 h-full flex flex-col">
                    {/* Header with icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/50 transition-shadow duration-300">
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-medium border border-teal-500/30">
                            {project.subtitle}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        Key Highlights
                      </h4>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech stack */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-medium border border-white/10 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Freelancing Section */}
      <section id="freelancing" className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-indigo-500/30">
                💼 Client Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Freelancing <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">Portfolio</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Delivering innovative solutions across IoT development and modern web applications for clients worldwide
              </p>
            </div>
          </ScrollReveal>

          {/* IoT Projects */}
          <ScrollReveal animation="fadeUp" delay={100}>
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg shadow-orange-500/25">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">IoT Projects</h3>
                  <p className="text-gray-400">Hardware & embedded solutions</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {freelancingProjects.iot.map((project, index) => (
                  <div key={index} className="group relative">
                    {/* Gradient border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl opacity-30 group-hover:opacity-70 blur transition-opacity duration-500"></div>

                    <div className="relative bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border border-orange-500/30">
                          {index === 0 && <Shield className="w-6 h-6 text-orange-400" />}
                          {index === 1 && <Home className="w-6 h-6 text-orange-400" />}
                          {index === 2 && <Car className="w-6 h-6 text-orange-400" />}
                        </div>
                        <h4 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">{project.title}</h4>
                      </div>

                      <p className="text-gray-400 mb-5 leading-relaxed flex-grow">{project.description}</p>

                      {/* Features */}
                      <div className="mb-5">
                        <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          Key Features
                        </h5>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                        {project.tech.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-500/10 text-orange-300 rounded-md text-xs font-medium border border-orange-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Web Development Projects */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Web Development</h3>
                  <p className="text-gray-400">Modern web applications & sites</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {freelancingProjects.web.map((project, index) => (
                  <div key={index} className="group relative">
                    {/* Gradient border glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl opacity-30 group-hover:opacity-70 blur transition-opacity duration-500"></div>

                    <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                      {/* Live Website Preview */}
                      {project.liveUrl && (
                        <div className="relative overflow-hidden">
                          <div className="w-full h-56 bg-slate-900/50 overflow-hidden">
                            <iframe
                              src={project.liveUrl}
                              title={`${project.title} Live Preview`}
                              className="w-full h-full border-0 pointer-events-none"
                              style={{
                                width: '200%',
                                height: '200%',
                                transform: 'scale(0.5)',
                                transformOrigin: 'top left'
                              }}
                              loading="lazy"
                              sandbox="allow-scripts allow-same-origin"
                            />
                          </div>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                          >
                            <span className="text-white font-medium flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/25">
                              <ExternalLink className="w-4 h-4" />
                              Visit Live Site
                            </span>
                          </a>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Status and link */}
                        {project.status && (
                          <div className="flex justify-between items-center mb-4">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                              {project.status}
                            </span>
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm font-medium"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View Site
                              </a>
                            )}
                          </div>
                        )}

                        {/* Title and subtitle */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</h4>
                            {project.subtitle && (
                              <p className="text-blue-400 text-sm font-medium">{project.subtitle}</p>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-400 mb-5 leading-relaxed">{project.description}</p>

                        {/* Features */}
                        <div className="mb-5">
                          <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Project Features</h5>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                          {project.tech.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* Contact Section */}
      < section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white" >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to collaborate on innovative AI/ML projects or discuss freelance opportunities? Let's connect!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-blue-200">Send me a message</p>
                  </div>
                </div>
                <p className="text-white">mmabdurrahman05@gmail.com</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-blue-200">Give me a call</p>
                  </div>
                </div>
                <p className="text-white">+91 9087786231</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-blue-200">Based in</p>
                  </div>
                </div>
                <p className="text-white">Madurai, Tamil Nadu, India</p>
              </div>

              <div className="text-center">
                <p className="text-blue-200 mb-4">Find me on professional networks</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/abdur-rahman-m-a1906636b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/AbdurRahman-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-200 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="text-green-300 text-center">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-300 text-center">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-8" >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Abdur Rahman. Crafted with passion for innovation in AI & ML.
          </p>
        </div>
      </footer >
    </div >
  );
}

export default App;