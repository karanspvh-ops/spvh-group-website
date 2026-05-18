export const SITE = {
  name: 'SPVH Group',
  title: 'SPVH Group | Asset & Investment Management',
  description:
    'A private holding group with focused subsidiaries in wealth management and alternative investments.',
  url:
    (typeof process !== 'undefined' && process.env.SITE_URL) ||
    'https://lively-tiger-site.pagesmith.app/',
  twitterHandle: '@spvhgroup',
  socials: {
    twitter: 'https://twitter.com/spvhgroup',
    github: '',
    linkedin: 'https://www.linkedin.com/company/spvhgroup',
  },
} as const;

export type SiteConfig = typeof SITE;
