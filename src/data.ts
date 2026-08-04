import type { Project, Skill, ContactInfo } from './types';

export const TOTAL_FRAMES = 240;

export const heroRoles = [
  'Programmer',
  'Web Designer',
  'App Developer',
  'Speed Learner 🚀',
  'CSE Student',
];

export const aboutBio = `Hi 👋, I'm Jihadul Islam Seyam — a CSE student at Green University of Bangladesh aiming to become a skilled Software Engineer. I am currently learning C, Java, JavaScript, React, MySQL, Python, Dart, and Flutter. I love building web apps, mobile interfaces, and mastering new technologies fast!`;

export const skills: Skill[] = [
  { name: 'Dart & Flutter', level: 85, category: 'mobile', icon: '🦋' },
  { name: 'JavaScript & React', level: 80, category: 'language', icon: '⚛️' },
  { name: 'Python', level: 75, category: 'language', icon: '🐍' },
  { name: 'C & Java', level: 78, category: 'language', icon: '☕' },
  { name: 'HTML5 & CSS3', level: 90, category: 'language', icon: '🎨' },
  { name: 'Tailwind CSS', level: 82, category: 'tool', icon: '🌊' },
  { name: 'MySQL', level: 70, category: 'backend', icon: '🗄️' },
  { name: 'REST APIs', level: 75, category: 'backend', icon: '🌐' },
  { name: 'Git & GitHub', level: 85, category: 'tool', icon: '🐙' },
  { name: 'VS Code', level: 90, category: 'tool', icon: '💻' },
];

export const techTags = [
  'C', 'Java', 'JavaScript', 'Python', 'Dart', 'React', 'Flutter',
  'HTML5', 'CSS3', 'Tailwind CSS', 'MySQL', 'Git', 'GitHub',
  'VS Code', 'REST API', 'JSON', 'Figma', 'Postman',
];

export const projects: Project[] = [
  {
    id: 'under-maintenance',
    title: 'Projects Under Maintenance 🛠️',
    description: 'My project showcase is currently undergoing a complete update and code refactoring. New Flutter mobile apps, web applications, and backend APIs will be published here soon!',
    tech: ['Flutter', 'Dart', 'React', 'TypeScript', 'MySQL'],
    category: 'flutter',
    gradient: 'grad-portfolio',
    emoji: '🚧',
    features: [
      'New Flutter cross-platform applications coming soon',
      'Refactored clean architecture & state management codebases',
      'Updated live demo URLs & GitHub repository links',
      'Check back shortly for new project showcases & case studies',
    ],
  },
];

export const contact: ContactInfo = {
  email: 'seyam.code@gmail.com',
  phone: '+880 1841-007360',
  location: 'Dhaka, Bangladesh',
  socials: [
    { name: 'GitHub', url: 'https://github.com/seyam-bhuiyan', icon: '⌨️' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jihadul-islam-seyam-497a6135a/', icon: '💼' },
    { name: 'Facebook', url: 'https://www.facebook.com/seyam.code/', icon: '📘' },
  ],
};

export const stats = [
  { value: '8+', label: 'Languages & Tools' },
  { value: '3rd Year', label: 'BSc CSE Student' },
  { value: '20+', label: 'Projects Built' },
];

export const highlights = [
  {
    icon: '🎓',
    title: 'Green University of Bangladesh',
    desc: 'BSc in Computer Science & Engineering (Ongoing)',
  },
  {
    icon: '🚀',
    title: 'Aspiring Software Engineer',
    desc: 'Learning C, Java, JS, React, Python, Dart & Flutter',
  },
  {
    icon: '⚡',
    title: 'Speed Learner & Builder',
    desc: 'Constantly building projects and expanding my core CS skills',
  },
];
