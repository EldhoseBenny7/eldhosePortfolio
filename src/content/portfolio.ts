export interface NavigationItem {
  label: string
  href: `#${string}`
}

export interface Project {
  title: string
  category: string
  description: string
  technologies: string[]
  features: string[]
  visual: 'library' | 'delivery' | 'film'
}

export interface Education {
  qualification: string
  institution: string
  period: string
  result: string
}

export interface ContactDetails {
  email: string
  github: string
  linkedIn: string
}

export interface CapabilityGroup {
  label: string
  items: string[]
}

export const portfolio = {
  name: 'Eldhose Benny',
  role: 'Full-Stack Web Developer',
  introduction:
    'I build thoughtful web applications, from frontend interfaces to server-side systems.',
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavigationItem[],
  projects: [
    {
      title: 'TownLibrary',
      category: 'Library management system',
      description:
        'TownLibrary is a library system for browsing books, requesting loans, and tracking checkouts and returns.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP'],
      features: [
        'Account registration and role-based access',
        'Browse books and request loans',
        'Borrow and return tracking with status updates',
        'Countdowns before borrow requests expire',
      ],
      visual: 'library',
    },
    {
      title: 'ShipEasy',
      category: 'Delivery and shipment tracking',
      description:
        'ShipEasy is a delivery web app for placing orders, tracking shipments in real time, and contacting support through in-app chat.',
      technologies: [
        'React',
        'Tailwind CSS',
        'JWT',
        'MongoDB',
        'Express.js',
        'Node.js',
      ],
      features: [
        'Account registration and order placement',
        'Live shipment tracking with status updates',
        'In-app chat support',
        'Responsive interface',
      ],
      visual: 'delivery',
    },
    {
      title: 'CineChain',
      category: 'Film professional networking and hiring platform',
      description:
        'CineChain helps film professionals create profiles and portfolios, connect with peers, and explore company pages and job listings.',
      technologies: [
        'MongoDB',
        'Express.js',
        'React',
        'Node.js',
        'Tailwind CSS',
        'Mongoose',
        'React Router',
        'JWT',
        'bcrypt',
      ],
      features: [
        'Professional profiles and portfolio showcases',
        'Connections with other film professionals',
        'Company pages and job listings',
        'Role-based access for users and administrators',
      ],
      visual: 'film',
    },
  ] satisfies Project[],
  education: [
    {
      qualification: 'Bachelor of Computer Applications',
      institution: 'Marian College Kuttikkanam Autonomous',
      period: 'BCA · 2023–2026',
      result: 'CGPA · 7.8',
    },
    {
      qualification: 'Higher Secondary / 10+2 — Computer Science',
      institution: "St. Stephen's Higher Secondary School, Keerampara",
      period: '2021–2023',
      result: '89%',
    },
    {
      qualification: 'Class 10',
      institution: "St. Stephen's Higher Secondary School, Keerampara",
      period: '2020–2021',
      result: '95.5%',
    },
  ] satisfies Education[],
  about: [
    "I'm Eldhose Benny, a developer building responsive, useful web applications.",
    'My projects include CineChain, ShipEasy, and TownLibrary, with work spanning frontend interfaces, authentication, APIs, and database-backed features.',
    'I value clear, maintainable code, collaborative problem-solving, and user experiences that work as well as they look.',
  ],
  capabilityGroups: [
    {
      label: 'Tools & technologies',
      items: [
        'JavaScript',
        'C++',
        'Java',
        'MERN stack',
        'MySQL',
        'MongoDB',
        'GitHub',
      ],
    },
    {
      label: 'Interpersonal skills',
      items: ['Communication', 'Collaboration'],
    },
  ],
  contact: {
    email: 'eldhose.benny.work@gmail.com',
    github: 'https://github.com/EldhoseBenny7',
    linkedIn: 'https://www.linkedin.com/in/eldhose-benny-149005277',
  } satisfies ContactDetails,
}
