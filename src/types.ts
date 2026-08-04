// TypeScript interfaces for the portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'flutter' | 'web' | 'backend';
  gradient: string;
  emoji: string;
  github?: string;
  demo?: string;
  features: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'mobile' | 'language' | 'backend' | 'tool';
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}
