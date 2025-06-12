import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { PageSection } from '../types/cms';
import { getIcon } from '../utils/iconMap';
import { Star, Mail, Phone, MapPin } from 'lucide-react';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPageBySlug } = useCMS();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const page = getPageBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
          <a
            href="/"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const renderSection = (section: PageSection) => {
    const baseClasses = `${section.backgroundColor || 'bg-white'} ${section.textColor || 'text-gray-900'}`;

    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} className={`py-20 ${baseClasses} relative overflow-hidden`}>
            {section.imageUrl && (
              <div className="absolute inset-0">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                {section.title && (
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                    {section.title}
                  </h1>
                )}
                {section.content && (
                  <p className="text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-90">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </section>
        );

      case 'text':
        return (
          <section key={section.id} className={`py-16 ${baseClasses}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {section.title && (
                <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
              )}
              {section.content && (
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'features':
        const features = section.settings?.features || [];
        return (
          <section key={section.id} className={`py-16 ${baseClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {section.title && (
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  {section.content && (
                    <p className="text-lg opacity-80 max-w-2xl mx-auto">{section.content}</p>
                  )}
                </div>
              )}
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature: any, index: number) => {
                  const IconComponent = getIcon(feature.icon);
                  return (
                    <div key={index} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-500/30 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="opacity-80 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );

      case 'image':
        return (
          <section key={section.id} className={`py-16 ${baseClasses}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {section.title && (
                <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
              )}
              {section.imageUrl && (
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={section.imageUrl}
                    alt={section.title || 'Section image'}
                    className="w-full h-auto"
                  />
                </div>
              )}
              {section.content && (
                <p className="text-center mt-6 text-lg opacity-80">{section.content}</p>
              )}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key={section.id} className={`py-16 ${baseClasses}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {section.title && (
                <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
              )}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  {section.content && (
                    <p className="text-lg mb-8 opacity-80">{section.content}</p>
                  )}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-emerald-600" />
                      <span>1-800-RENOBOOK</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-emerald-600" />
                      <span>hello@renobook.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        placeholder="Your Message"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags would go here in a real implementation */}
      {page.sections
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}
    </div>
  );
};

export default DynamicPage;