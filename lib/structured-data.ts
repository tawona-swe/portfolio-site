export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tawona Rwatida',
    url: 'https://tawonarwatida.co.zw',
    image: 'https://tawonarwatida.co.zw/images/avatar.png',
    jobTitle: 'Full Stack Software Developer',
    description: 'Full Stack Software Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python.',
    sameAs: [
      'https://github.com/tawonaqh',
      'https://linkedin.com/in/tawona-rwatida',
    ],
    email: 'tnrwatida@gmail.com',
    telephone: '+263783028721',
    location: {
      '@type': 'Place',
      name: 'Harare, Zimbabwe',
    },
    knowsAbout: [
      'Full Stack Development',
      'React',
      'Next.js',
      'Laravel',
      'Python',
      'E-commerce',
      'Mobile Development',
      'AI/NLP',
      'Docker',
      'AWS',
    ],
  }
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tawona Rwatida Portfolio',
    url: 'https://tawonarwatida.co.zw',
    logo: 'https://tawonarwatida.co.zw/favicon.svg',
    description: 'Portfolio of Tawona Rwatida, Full Stack Software Developer',
    sameAs: [
      'https://github.com/tawonaqh',
      'https://linkedin.com/in/tawona-rwatida',
    ],
  }
}

export function getProjectSchema(project: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    image: `https://tawonarwatida.co.zw${project.image}`,
    url: project.demo,
    applicationCategory: 'WebApplication',
    creator: {
      '@type': 'Person',
      name: 'Tawona Rwatida',
    },
    keywords: project.technologies.join(', '),
  }
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
