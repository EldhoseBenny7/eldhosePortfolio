export interface NavigationItem {
  label: string
  href: `#${string}`
}

export interface Project {
  title: string
  category: string
  description: string
  status: 'placeholder'
}

export interface Capability {
  name: string
  description: string
}

export const portfolio = {
  name: 'Your Name',
  role: 'Role or discipline goes here',
  introduction:
    'Replace this short introduction with a clear description of your work and the value you bring.',
  navigation: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavigationItem[],
  projects: [
    {
      title: 'Project title placeholder',
      category: 'Category placeholder',
      description:
        'Replace this card with a real project summary. No project details have been supplied.',
      status: 'placeholder',
    },
  ] satisfies Project[],
  about:
    'Replace this text with a first-person introduction. Share your focus and approach without adding unverified experience or claims.',
  capabilities: [] satisfies Capability[],
  email: null,
}
