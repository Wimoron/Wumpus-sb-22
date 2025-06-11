export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
}

export interface LaptopProduct {
  id: string;
  name: string;
  specs: string;
  price: number;
  originalPrice: number;
  rating: number;
  image?: string;
  color: string;
  featured: boolean;
  order: number;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  rating: number;
  comment: string;
  verified: boolean;
  color: string;
  order: number;
}

export interface FooterSection {
  id: string;
  title: string;
  links: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  order: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface CMSData {
  navigation: NavigationItem[];
  hero: HeroContent;
  benefits: BenefitItem[];
  laptops: LaptopProduct[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  footer: FooterSection[];
  contact: ContactInfo;
  newsletter: {
    title: string;
    description: string;
  };
}