import { DollarSign, Leaf, Shield, Laptop, Star, Check, Mail, Phone, MapPin, ChevronRight, Menu, X, DivideIcon as LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Leaf,
  Shield,
  Laptop,
  Star,
  Check,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Menu,
  X,
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Laptop;
};