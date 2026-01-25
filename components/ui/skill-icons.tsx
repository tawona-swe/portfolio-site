'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface SkillIconProps {
  name: string
  className?: string
}

// Technology name to SVG filename mapping
const techIconMap: Record<string, string> = {
  // Frontend Technologies
  'javascript': 'JavaScript.svg',
  'typescript': 'TypeScript.svg',
  'javascript/typescript': 'JavaScript.svg',
  'react': 'React.svg',
  'next.js': 'Next.js.svg',
  'nextjs': 'Next.js.svg',
  'react native': 'React.svg',
  'reactnative': 'React.svg',
  'html': 'HTML5.svg',
  'html/css': 'HTML5.svg',
  'css': 'CSS3.svg',
  'css3': 'CSS3.svg',
  'tailwind': 'Tailwind-CSS.svg',
  'tailwind css': 'Tailwind-CSS.svg',
  'bootstrap': 'Bootstrap.svg',
  'vue': 'Vue.js.svg',
  'vue.js': 'Vue.js.svg',
  'angular': 'Angular.svg',
  'svelte': 'Svelte.svg',
  
  // Backend Technologies
  'php': 'PHP.svg',
  'laravel': 'Laravel.svg',
  'php/laravel': 'Laravel.svg',
  'python': 'Python.svg',
  'django': 'Django.svg',
  'python/django': 'Django.svg',
  'java': 'Java.svg',
  'spring': 'Spring.svg',
  'spring boot': 'Spring.svg',
  'java/spring boot': 'Java.svg',
  'node.js': 'Node.js.svg',
  'nodejs': 'Node.js.svg',
  'express': 'Express.svg',
  'nest.js': 'Nest.js.svg',
  'nestjs': 'Nest.js.svg',
  'fastapi': 'FastAPI.svg',
  'flask': 'Flask.svg',
  
  // Databases
  'mysql': 'MySQL.svg',
  'postgresql': 'PostgresSQL.svg',
  'postgres': 'PostgresSQL.svg',
  'mongodb': 'MongoDB.svg',
  'redis': 'Redis.svg',
  'sqlite': 'SQLite.svg',
  
  // DevOps & Cloud
  'docker': 'Docker.svg',
  'aws': 'AWS.svg',
  'azure': 'Azure.svg',
  'google cloud': 'Google-Cloud.svg',
  'kubernetes': 'Kubernetes.svg',
  'jenkins': 'Jenkins.svg',
  'github actions': 'GitHub-Actions.svg',
  'gitlab': 'GitLab.svg',
  'vercel': 'Vercel.svg',
  'heroku': 'Heroku.svg',
  'digital ocean': 'Digital-Ocean.svg',
  
  // Tools & Others
  'git': 'Git.svg',
  'github': 'GitHub.svg',
  'vscode': 'Visual-Studio-Code-(VS-Code).svg',
  'visual studio code': 'Visual-Studio-Code-(VS-Code).svg',
  'figma': 'Figma.svg',
  'postman': 'Postman.svg',
  'webpack': 'Webpack.svg',
  'vite': 'Vite.svg',
  'npm': 'NPM.svg',
  'yarn': 'Yarn.svg',
  'eslint': 'ESLint.svg',
  'babel': 'Babel.svg',
  'sass': 'Sass.svg',
  'less': 'Less.js.svg',
  
  // Mobile & Desktop
  'flutter': 'Flutter.svg',
  'dart': 'Dart.svg',
  'kotlin': 'Kotlin.svg',
  'swift': 'Swift.svg',
  'electron': 'Electron.svg',
  
  // Testing
  'jest': 'Jest.svg',
  'cypress': 'Cypress.svg',
  'selenium': 'Selenium.svg',
  
  // Other Languages
  'c': 'C.svg',
  'c++': 'C++-(CPlusPlus).svg',
  'c#': 'C#-(CSharp).svg',
  'csharp': 'C#-(CSharp).svg',
  'go': 'Go.svg',
  'rust': 'Rust.svg',
  'ruby': 'Ruby.svg',
  'ruby on rails': 'Ruby-on-Rails.svg',
  'rails': 'Ruby-on-Rails.svg',
  'php': 'PHP.svg',
  'perl': 'Perl.svg',
  'lua': 'Lua.svg',
  'r': 'R-.svg',
  'matlab': 'MATLAB.svg',
  
  // Frameworks & Libraries
  'jquery': 'jQuery.svg',
  'd3': 'D3.js.svg',
  'd3.js': 'D3.js.svg',
  'three.js': 'Three.js.svg',
  'threejs': 'Three.js.svg',
  'graphql': 'GraphQL.svg',
  'apollo': 'GraphQL.svg',
  'redux': 'Redux.svg',
  'mobx': 'MobX.svg',
  
  // CMS & E-commerce
  'wordpress': 'WordPress.svg',
  'drupal': 'Drupal.svg',
  'shopify': 'Shopware.svg',
  'magento': 'Adobe-Commerce-(Magneto).svg',
  
  // Data & Analytics
  'tensorflow': 'TensorFlow.svg',
  'pytorch': 'PyTorch.svg',
  'pandas': 'Pandas.svg',
  'numpy': 'NumPy.svg',
  'jupyter': 'Jupyter.svg',
  'anaconda': 'Anaconda.svg',
  
  // Operating Systems
  'linux': 'Linux.svg',
  'ubuntu': 'Ubuntu.svg',
  'centos': 'CentOS.svg',
  'debian': 'Debian.svg',
  'windows': 'Windows-11.svg',
  'macos': 'Apple.svg',
  
  // Browsers
  'chrome': 'Chrome.svg',
  'firefox': 'Firefox.svg',
  'safari': 'Apple-Safari.svg',
  'edge': 'Chrome.svg',
  
  // Design Tools
  'photoshop': 'Adobe-Photoshop.svg',
  'illustrator': 'Adobe-Illustrator.svg',
  'xd': 'Adobe-XD.svg',
  'sketch': 'Sketch.svg',
  'canva': 'Canva.svg',
  'blender': 'Blender.svg',
  
  // Communication & Project Management
  'slack': 'Slack.svg',
  'discord': 'Discord.js.svg',
  'trello': 'Trello.svg',
  'jira': 'Jira.svg',
  'confluence': 'Confluence.svg',
  
  // API & Documentation
  'restful apis': 'OpenAPI.svg',
  'api': 'OpenAPI.svg',
  'swagger': 'Swagger.svg',
  'openapi': 'OpenAPI.svg',
  
  // Additional Technologies from Portfolio
  'webflow': 'Webflow.svg',
  'visual basic': 'Visual-Studio.svg',
  'vb.net': 'Visual-Studio.svg',
  'power bi': 'Microsoft-SQL-Server.svg',
  'nlp': 'Python.svg',
  'data encryption': 'OpenSSL.svg',
  'ci/cd': 'GitHub-Actions.svg',
  'cron jobs': 'Linux.svg',
  'web scraping': 'Python.svg',
  'government systems': 'Linux.svg',
  'rabbitmq': 'RabbitMQ.svg'
}

export function SkillIcon({ name, className = "w-8 h-8" }: SkillIconProps) {
  const iconFileName = techIconMap[name.toLowerCase()]
  
  if (iconFileName) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Image
          src={`/icons/${iconFileName}`}
          alt={`${name} icon`}
          width={32}
          height={32}
          className={className}
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(1)',
            objectFit: 'contain'
          }}
        />
      </motion.div>
    )
  }

  // Fallback for technologies without SVG icons
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`${className} bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
        {name.charAt(0).toUpperCase()}
      </div>
    </motion.div>
  )
}

// Alias for backward compatibility
export function TechIcon({ name, className = "w-8 h-8" }: SkillIconProps) {
  return <SkillIcon name={name} className={className} />
}