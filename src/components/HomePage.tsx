import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Shield, Leaf, DollarSign, Star, Check, Mail, Phone, MapPin, ChevronRight, Menu, X } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { EditableText } from './EditableText';
import { CMSControls } from './CMSControls';
import { getIcon } from '../utils/iconMap';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const { data, updateData, resetData, isEditing, setIsEditing } = useCMS();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    
    // Add success animation
    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => button.classList.remove('animate-pulse'), 1000);
    }
  };

  const updateHero = (field: keyof typeof data.hero, value: string) => {
    updateData({
      hero: { ...data.hero, [field]: value }
    });
  };

  const updateNewsletter = (field: keyof typeof data.newsletter, value: string) => {
    updateData({
      newsletter: { ...data.newsletter, [field]: value }
    });
  };

  const updateContact = (field: keyof typeof data.contact, value: string) => {
    updateData({
      contact: { ...data.contact, [field]: value }
    });
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    const updatedBenefits = data.benefits.map(benefit =>
      benefit.id === id ? { ...benefit, [field]: value } : benefit
    );
    updateData({ benefits: updatedBenefits });
  };

  const updateLaptop = (id: string, field: string, value: string | number) => {
    const updatedLaptops = data.laptops.map(laptop =>
      laptop.id === id ? { ...laptop, [field]: value } : laptop
    );
    updateData({ laptops: updatedLaptops });
  };

  const updateTestimonial = (id: string, field: string, value: string) => {
    const updatedTestimonials = data.testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    );
    updateData({ testimonials: updatedTestimonials });
  };

  const updateProcessStep = (id: string, field: string, value: string) => {
    const updatedProcess = data.process.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    );
    updateData({ process: updatedProcess });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* CMS Controls */}
      <CMSControls
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onReset={resetData}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl translate-y-0' 
          : 'bg-transparent translate-y-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition-all duration-300 group-hover:scale-110"></div>
                <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-500 p-2 rounded-xl transform group-hover:rotate-3 transition-all duration-300">
                  <Laptop className="h-7 w-7 text-white transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  RenoBook
                </span>
                <div className="text-xs text-emerald-400 font-medium tracking-wider transform group-hover:tracking-widest transition-all duration-300">
                  PREMIUM REFURBISHED
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {data.navigation.sort((a, b) => a.order - b.order).map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-200">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </a>
              ))}
              
              {/* Admin Link */}
              <Link
                to="/admin"
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group"
              >
                <span className="relative z-10 transform group-hover:scale-105 transition-transform duration-200">Admin</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-400/10 rounded-lg scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
              
              {/* CTA Button */}
              <div className="ml-6">
                <button className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 hover:-translate-y-0.5">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative flex items-center space-x-2">
                    <span>Shop Now</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-45 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'}`}>
                  <Menu className="h-6 w-6" />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-45 opacity-0 scale-75'}`}>
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl mx-4 mb-4 p-6 transform transition-all duration-500 scale-95 hover:scale-100">
              <div className="space-y-4">
                {data.navigation.sort((a, b) => a.order - b.order).map((item, index) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 transform hover:translate-x-2"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: isMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/admin"
                  className="block text-gray-300 hover:text-white transition-all duration-300 py-2 px-4 rounded-lg hover:bg-white/5 transform hover:translate-x-2"
                >
                  Admin
                </Link>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform">
                  <span>Shop Now</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              <EditableText
                value={data.hero.title.split(' ').slice(0, -1).join(' ')}
                onChange={(value) => updateHero('title', `${value} ${data.hero.subtitle}`)}
                isEditing={isEditing}
                className="inline transform hover:scale-105 transition-transform duration-300"
              />
              <span className="text-emerald-400 block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <EditableText
                  value={data.hero.subtitle}
                  onChange={(value) => updateHero('subtitle', value)}
                  isEditing={isEditing}
                  className="inline bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent"
                />
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <EditableText
                value={data.hero.description}
                onChange={(value) => updateHero('description', value)}
                isEditing={isEditing}
                multiline
                className="inline"
              />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center group">
                <EditableText
                  value={data.hero.primaryButtonText}
                  onChange={(value) => updateHero('primaryButtonText', value)}
                  isEditing={isEditing}
                  className="inline"
                />
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
                <EditableText
                  value={data.hero.secondaryButtonText}
                  onChange={(value) => updateHero('secondaryButtonText', value)}
                  isEditing={isEditing}
                  className="inline group-hover:text-emerald-400 transition-colors duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        id="benefits" 
        data-animate 
        className="py-16 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has('benefits') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Refurbished?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Make a smart choice for your wallet and the planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.benefits.sort((a, b) => a.order - b.order).map((benefit, index) => {
              const IconComponent = getIcon(benefit.icon);
              const colorClasses = {
                emerald: 'bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-400',
                green: 'bg-green-500/20 group-hover:bg-green-500/30 text-green-400',
                blue: 'bg-blue-500/20 group-hover:bg-blue-500/30 text-blue-400',
              };

              return (
                <div 
                  key={benefit.id} 
                  className={`text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                    visibleSections.has('benefits') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`w-16 h-16 ${colorClasses[benefit.color as keyof typeof colorClasses] || colorClasses.emerald} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    <IconComponent className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                    <EditableText
                      value={benefit.title}
                      onChange={(value) => updateBenefit(benefit.id, 'title', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    <EditableText
                      value={benefit.description}
                      onChange={(value) => updateBenefit(benefit.id, 'description', value)}
                      isEditing={isEditing}
                      multiline
                      className="inline"
                    />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Laptops */}
      <section 
        id="laptops" 
        data-animate 
        className="py-16 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has('laptops') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-4">Featured Laptops</h2>
            <p className="text-gray-400">Carefully selected and thoroughly tested</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.laptops.filter(laptop => laptop.featured).sort((a, b) => a.order - b.order).map((laptop, index) => {
              const colorClasses = {
                gray: 'from-gray-700 to-gray-800 text-gray-500 group-hover:text-gray-300',
                blue: 'from-blue-900/50 to-blue-800/50 text-blue-400 group-hover:text-blue-300',
                purple: 'from-purple-900/50 to-purple-800/50 text-purple-400 group-hover:text-purple-300',
              };

              return (
                <div 
                  key={laptop.id} 
                  className={`bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-700 hover:border-emerald-500/50 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                    visibleSections.has('laptops') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`aspect-w-16 aspect-h-10 bg-gradient-to-br ${colorClasses[laptop.color as keyof typeof colorClasses] || colorClasses.gray} p-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-center justify-center relative z-10">
                      <Laptop className="h-24 w-24 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      <EditableText
                        value={laptop.name}
                        onChange={(value) => updateLaptop(laptop.id, 'name', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      <EditableText
                        value={laptop.specs}
                        onChange={(value) => updateLaptop(laptop.id, 'specs', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                          $<EditableText
                            value={laptop.price.toString()}
                            onChange={(value) => updateLaptop(laptop.id, 'price', parseInt(value) || 0)}
                            isEditing={isEditing}
                            className="inline"
                          />
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          $<EditableText
                            value={laptop.originalPrice.toString()}
                            onChange={(value) => updateLaptop(laptop.id, 'originalPrice', parseInt(value) || 0)}
                            isEditing={isEditing}
                            className="inline"
                          />
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-emerald-400">
                        <Star className="h-4 w-4 fill-current animate-pulse" />
                        <span className="ml-1">{laptop.rating}</span>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 group-hover:animate-pulse">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`text-center mt-12 transition-all duration-1000 ${
            visibleSections.has('laptops') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`} style={{ transitionDelay: '0.5s' }}>
            <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/25">
              View All Laptops
            </button>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section 
        id="process" 
        data-animate 
        className="py-16 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has('process') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-4">Our Quality Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every laptop goes through our comprehensive 47-point inspection
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {data.process.sort((a, b) => a.order - b.order).map((step, index) => (
              <div 
                key={step.id} 
                className={`text-center group cursor-pointer transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  visibleSections.has('process') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg group-hover:bg-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                  {step.step}
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  <EditableText
                    value={step.title}
                    onChange={(value) => updateProcessStep(step.id, 'title', value)}
                    isEditing={isEditing}
                    className="inline"
                  />
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  <EditableText
                    value={step.description}
                    onChange={(value) => updateProcessStep(step.id, 'description', value)}
                    isEditing={isEditing}
                    multiline
                    className="inline"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials" 
        data-animate 
        className="py-16 bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            visibleSections.has('testimonials') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.sort((a, b) => a.order - b.order).map((testimonial, index) => {
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
              };

              return (
                <div 
                  key={testimonial.id} 
                  className={`bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group ${
                    visibleSections.has('testimonials') 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" 
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
                    "<EditableText
                      value={testimonial.comment}
                      onChange={(value) => updateTestimonial(testimonial.id, 'comment', value)}
                      isEditing={isEditing}
                      multiline
                      className="inline"
                    />"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[testimonial.color as keyof typeof colorClasses] || colorClasses.blue} rounded-full flex items-center justify-center text-white font-semibold text-sm group-hover:scale-110 transition-transform duration-300`}>
                      <EditableText
                        value={testimonial.initials}
                        onChange={(value) => updateTestimonial(testimonial.id, 'initials', value)}
                        isEditing={isEditing}
                        className="inline"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                        <EditableText
                          value={testimonial.name}
                          onChange={(value) => updateTestimonial(testimonial.id, 'name', value)}
                          isEditing={isEditing}
                          className="inline"
                        />
                      </p>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section 
        id="newsletter" 
        data-animate 
        className="py-16 bg-gray-800"
      >
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          visibleSections.has('newsletter') 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-white mb-4">
            <EditableText
              value={data.newsletter.title}
              onChange={(value) => updateNewsletter('title', value)}
              isEditing={isEditing}
              className="inline"
            />
          </h2>
          <p className="text-gray-400 mb-8">
            <EditableText
              value={data.newsletter.description}
              onChange={(value) => updateNewsletter('description', value)}
              isEditing={isEditing}
              multiline
              className="inline"
            />
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 focus:scale-105"
              required
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4 group">
                <Laptop className="h-8 w-8 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-xl font-bold group-hover:text-emerald-400 transition-colors duration-300">RenoBook</span>
              </div>
              <p className="text-gray-400 mb-4">
                Premium refurbished laptops with quality you can trust.
              </p>
              <div className="flex space-x-4">
                {['f', 't', 'in'].map((social, index) => (
                  <div 
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-sm font-bold">{social}</span>
                  </div>
                ))}
              </div>
            </div>

            {data.footer.sort((a, b) => a.order - b.order).map((section, sectionIndex) => (
              <div key={section.id} className="animate-fade-in-up" style={{ animationDelay: `${(sectionIndex + 1) * 200}ms` }}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.id}>
                      <a 
                        href={link.href} 
                        className="hover:text-emerald-400 transition-all duration-300 transform hover:translate-x-1 inline-block"
                        style={{ transitionDelay: `${linkIndex * 50}ms` }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2 group hover:text-emerald-400 transition-colors duration-300">
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>
                    <EditableText
                      value={data.contact.phone}
                      onChange={(value) => updateContact('phone', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
                <div className="flex items-center space-x-2 group hover:text-emerald-400 transition-colors duration-300">
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>
                    <EditableText
                      value={data.contact.email}
                      onChange={(value) => updateContact('email', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
                <div className="flex items-center space-x-2 group hover:text-emerald-400 transition-colors duration-300">
                  <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>
                    <EditableText
                      value={data.contact.address}
                      onChange={(value) => updateContact('address', value)}
                      isEditing={isEditing}
                      className="inline"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <p>&copy; 2025 RenoBook. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default HomePage;