import { CMSData } from '../types/cms';

export const cmsData: CMSData = {
  navigation: [
    { id: 'nav-1', label: 'Laptops', href: '#laptops', order: 1 },
    { id: 'nav-2', label: 'About', href: '#about', order: 2 },
    { id: 'nav-3', label: 'Contact', href: '#contact', order: 3 },
  ],
  
  hero: {
    title: 'Premium Refurbished Laptops',
    subtitle: 'Laptops',
    description: 'Discover exceptional quality, thoroughly tested laptops at unbeatable prices. Each device comes with our comprehensive warranty and commitment to sustainability.',
    primaryButtonText: 'Browse Laptops',
    secondaryButtonText: 'Learn More',
  },

  benefits: [
    {
      id: 'benefit-1',
      icon: 'DollarSign',
      title: 'Save Up to 70%',
      description: 'Get premium laptops at a fraction of the original price without compromising on quality or performance.',
      color: 'emerald',
      order: 1,
    },
    {
      id: 'benefit-2',
      icon: 'Leaf',
      title: 'Eco-Friendly',
      description: 'Reduce electronic waste and carbon footprint by giving quality devices a second life.',
      color: 'green',
      order: 2,
    },
    {
      id: 'benefit-3',
      icon: 'Shield',
      title: 'Quality Assured',
      description: 'Every laptop undergoes rigorous testing and comes with a comprehensive warranty for peace of mind.',
      color: 'blue',
      order: 3,
    },
  ],

  laptops: [
    {
      id: 'laptop-1',
      name: 'MacBook Pro 13"',
      specs: 'Apple M1 • 8GB RAM • 256GB SSD',
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      color: 'gray',
      featured: true,
      order: 1,
    },
    {
      id: 'laptop-2',
      name: 'Dell XPS 13',
      specs: 'Intel i7 • 16GB RAM • 512GB SSD',
      price: 749,
      originalPrice: 1199,
      rating: 4.7,
      color: 'blue',
      featured: true,
      order: 2,
    },
    {
      id: 'laptop-3',
      name: 'ThinkPad X1 Carbon',
      specs: 'Intel i5 • 8GB RAM • 256GB SSD',
      price: 599,
      originalPrice: 999,
      rating: 4.9,
      color: 'purple',
      featured: true,
      order: 3,
    },
  ],

  process: [
    {
      id: 'process-1',
      step: 1,
      title: 'Inspection',
      description: 'Thorough hardware and software testing',
      order: 1,
    },
    {
      id: 'process-2',
      step: 2,
      title: 'Cleaning',
      description: 'Professional deep cleaning and sanitization',
      order: 2,
    },
    {
      id: 'process-3',
      step: 3,
      title: 'Refurbishing',
      description: 'Component replacement and upgrades',
      order: 3,
    },
    {
      id: 'process-4',
      step: 4,
      title: 'Certification',
      description: 'Final quality check and warranty activation',
      order: 4,
    },
  ],

  testimonials: [
    {
      id: 'testimonial-1',
      name: 'Sarah Johnson',
      initials: 'SJ',
      rating: 5,
      comment: 'Amazing quality and incredible value. My refurbished MacBook works like new and I saved over $500!',
      verified: true,
      color: 'blue',
      order: 1,
    },
    {
      id: 'testimonial-2',
      name: 'Mike Chen',
      initials: 'MC',
      rating: 5,
      comment: 'Excellent service and fast shipping. The laptop arrived in perfect condition with all accessories.',
      verified: true,
      color: 'green',
      order: 2,
    },
    {
      id: 'testimonial-3',
      name: 'Emily Rodriguez',
      initials: 'ER',
      rating: 5,
      comment: 'Great experience from start to finish. The warranty gives me peace of mind about my purchase.',
      verified: true,
      color: 'purple',
      order: 3,
    },
  ],

  footer: [
    {
      id: 'footer-1',
      title: 'Shop',
      order: 1,
      links: [
        { id: 'shop-1', label: 'MacBooks', href: '#' },
        { id: 'shop-2', label: 'Windows Laptops', href: '#' },
        { id: 'shop-3', label: 'Gaming Laptops', href: '#' },
        { id: 'shop-4', label: 'Business Laptops', href: '#' },
      ],
    },
    {
      id: 'footer-2',
      title: 'Support',
      order: 2,
      links: [
        { id: 'support-1', label: 'Warranty', href: '#' },
        { id: 'support-2', label: 'Returns', href: '#' },
        { id: 'support-3', label: 'FAQ', href: '#' },
        { id: 'support-4', label: 'Contact Us', href: '#' },
      ],
    },
  ],

  contact: {
    phone: '1-800-RENOBOOK',
    email: 'hello@renobook.com',
    address: 'San Francisco, CA',
  },

  newsletter: {
    title: 'Stay Updated',
    description: 'Get notified about new arrivals, exclusive deals, and tech tips',
  },
};