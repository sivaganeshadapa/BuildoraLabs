export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  short_description?: string;
  industry?: string;
  technologies: string[];
  live_url: string;
  featured: boolean;
  year: number;
}

export const featuredProjects: ProjectItem[] = [
  {
    id: 'flexconnect',
    title: 'FlexConnect',
    slug: 'flexconnect',
    category: 'Marketplace',
    description: 'OOH Advertising & Billboard Marketplace Platform connecting advertisers with physical outdoor advertising spaces.',
    short_description: 'OOH Advertising Marketplace',
    industry: 'Advertising',
    technologies: ['Marketplace', 'SaaS', 'Maps', 'Payments', 'Database'],
    live_url: 'https://flexconn.netlify.app/',
    featured: true,
    year: 2026,
  },
  {
    id: 'smartwiring-ai',
    title: 'SmartWiring AI',
    slug: 'smartwiring-ai',
    category: 'Web Application',
    description: 'AI-Powered Electrical Planning Platform combining electrical engineering with web application development.',
    short_description: 'AI-Powered Electrical Planning',
    industry: 'Engineering',
    technologies: ['AI', 'Engineering', 'Automation', 'Web App'],
    live_url: 'https://smartwiringai.netlify.app/',
    featured: true,
    year: 2026,
  },
  {
    id: 'hare-krishna-chemicals',
    title: 'Hare Krishna Chemicals',
    slug: 'hare-krishna-chemicals',
    category: 'Business Website',
    description: 'B2B Chemical Manufacturing & Business Website.',
    short_description: 'B2B Chemical Manufacturing Platform',
    industry: 'Manufacturing',
    technologies: ['React', 'Responsive Design', 'B2B'],
    live_url: 'https://harekrishnachemicals.netlify.app/',
    featured: true,
    year: 2026,
  },
  {
    id: 'dr-sameer-portfolio',
    title: 'Dr. Sameer Portfolio',
    slug: 'dr-sameer-portfolio',
    category: 'Healthcare Portfolio',
    description: 'Professional medical portfolio and patient consultation profile for Dr. Sameer.',
    short_description: 'Medical Professional Portfolio',
    industry: 'Healthcare',
    technologies: ['React', 'Responsive Design', 'Healthcare'],
    live_url: 'https://drsameer.netlify.app/',
    featured: true,
    year: 2026,
  },
  {
    id: 'siva-ganesh-portfolio',
    title: 'SIVA GANESH PORTFOLIO',
    slug: 'siva-ganesh-portfolio',
    category: 'Portfolio',
    description: 'Personal Portfolio & Professional Profile demonstrating modern UI and developer branding.',
    short_description: 'Professional Developer Portfolio',
    industry: 'Technology',
    technologies: ['Portfolio', 'Personal Branding', 'UI/UX'],
    live_url: 'https://sivaganeshadapa.netlify.app/',
    featured: true,
    year: 2025,
  },
];
