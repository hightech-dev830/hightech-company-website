export const companyServices = [
  {
    title: 'Web development',
    description: 'Customer portals, business tools and connected web platforms.',
    href: '/services/web-development',
    category: 'Build for the browser',
  },
  {
    title: 'Mobile applications',
    description: 'Focused experiences for customers and people in the field.',
    href: '/services#service-mobile',
    category: 'Go beyond the desktop',
  },
  {
    title: 'Custom software',
    description: 'Purpose-built systems for the way your business actually works.',
    href: '/services#service-web',
    category: 'Connect your operations',
  },
  {
    title: 'AI & automation',
    description: 'Knowledge assistants and workflows with people in control.',
    href: '/services#service-ai',
    category: 'Put information to work',
  },
  {
    title: 'UI/UX design',
    description: 'Research, prototypes and interfaces that make the next step clear.',
    href: '/services#service-product',
    category: 'Make complexity usable',
  },
  {
    title: 'Product delivery',
    description: 'Technical planning, testing and a considered path to release.',
    href: '/services#service-product',
    category: 'Move from idea to launch',
  },
] as const;

export const deliverySteps = [
  {
    title: 'Understand the problem',
    description:
      'Start with your users, existing systems and constraints. Agree what a useful first release needs to achieve.',
    output: 'A shared brief',
  },
  {
    title: 'Make it tangible',
    description:
      'Use prototypes and technical experiments to test the important assumptions before a full build.',
    output: 'A direction you can test',
  },
  {
    title: 'Build in the open',
    description:
      'Review working software together. Keep testing, feedback and scope decisions part of the same conversation.',
    output: 'Visible, working progress',
  },
  {
    title: 'Launch & move forward',
    description:
      'Prepare the release, document the decisions and agree the handover and support arrangements.',
    output: 'A considered next step',
  },
] as const;
