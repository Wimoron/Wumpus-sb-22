import { DynamicPage } from '../types/cms';

export const samplePages: DynamicPage[] = [
  {
    id: 'page-about',
    slug: 'about',
    title: 'About RenoBook',
    description: 'Learn about our mission to provide quality refurbished laptops',
    isPublished: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    seoTitle: 'About RenoBook - Premium Refurbished Laptops',
    seoDescription: 'Discover RenoBook\'s commitment to quality, sustainability, and customer satisfaction in the refurbished laptop market.',
    sections: [
      {
        id: 'about-hero',
        type: 'hero',
        title: 'About RenoBook',
        content: 'We\'re passionate about giving premium laptops a second life while making technology accessible to everyone.',
        backgroundColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
        textColor: 'text-white',
        order: 1,
      },
      {
        id: 'about-story',
        type: 'text',
        title: 'Our Story',
        content: 'Founded in 2020, RenoBook emerged from a simple belief: quality technology shouldn\'t be wasteful or unaffordable. Our team of certified technicians carefully selects, tests, and refurbishes each laptop to meet the highest standards.\n\nWe\'ve helped thousands of customers find their perfect laptop while reducing electronic waste by over 50,000 devices. Every purchase supports our mission of sustainable technology and environmental responsibility.',
        backgroundColor: 'bg-white',
        textColor: 'text-gray-900',
        order: 2,
      },
      {
        id: 'about-mission',
        type: 'features',
        title: 'Our Mission',
        content: 'Three core values drive everything we do',
        backgroundColor: 'bg-gray-50',
        textColor: 'text-gray-900',
        order: 3,
        settings: {
          features: [
            {
              icon: 'Shield',
              title: 'Quality First',
              description: 'Every laptop undergoes our rigorous 47-point inspection process'
            },
            {
              icon: 'Leaf',
              title: 'Sustainability',
              description: 'Reducing e-waste while extending the life of premium devices'
            },
            {
              icon: 'Heart',
              title: 'Customer Care',
              description: 'Comprehensive warranties and dedicated support for every purchase'
            }
          ]
        }
      }
    ],
  },
  {
    id: 'page-warranty',
    slug: 'warranty',
    title: 'Warranty & Support',
    description: 'Comprehensive warranty coverage and support for your refurbished laptop',
    isPublished: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    sections: [
      {
        id: 'warranty-hero',
        type: 'hero',
        title: 'Warranty & Support',
        content: 'Your peace of mind is our priority. Every RenoBook laptop comes with comprehensive warranty coverage.',
        backgroundColor: 'bg-gradient-to-br from-emerald-900 to-emerald-800',
        textColor: 'text-white',
        order: 1,
      },
      {
        id: 'warranty-coverage',
        type: 'text',
        title: 'What\'s Covered',
        content: '• 12-month comprehensive warranty on all components\n• Free technical support via phone, email, and chat\n• Hardware replacement for manufacturing defects\n• Software troubleshooting and reinstallation\n• Battery performance guarantee (minimum 80% capacity)\n• Free return shipping for warranty claims\n\nOur warranty covers everything from hardware failures to software issues, ensuring your laptop performs like new throughout the coverage period.',
        backgroundColor: 'bg-white',
        textColor: 'text-gray-900',
        order: 2,
      }
    ],
  }
];