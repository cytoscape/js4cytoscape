// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// Configure base URL for different environments  
const isLocal = typeof process !== 'undefined' && process.env.DOCUSAURUS_LOCAL === 'true';
const siteUrl = isLocal ? 'http://localhost:8000' : 'https://cytoscape.org';
const basePath = isLocal ? '' : '/js4cytoscape/ndex-client';
// Use full URL with target="_self" to force same-tab navigation
const apiUrl = `${siteUrl}${basePath}/api/`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NDEx JavaScript Client',
  tagline: 'A TypeScript/JavaScript client library for the NDEx (Network Data Exchange) API',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `${basePath}/guide/build/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Cytoscape', // Usually your GitHub org/user name.
  projectName: 'ndex-client', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/js4cytoscape/js4cytoscape/tree/ndex3-major-refactor/packages/ndex-client/docs-root/guide/',
          routeBasePath: '/', // Serve docs at the site root
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'NDEx Client',
        logo: {
          alt: 'NDEx Logo',
          src: 'img/ndex-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: "User's Guide",
          },
          {
            href: apiUrl,
            label: 'API Reference',
            position: 'left',
            target: '_self'
          },
          {
            href: 'https://github.com/js4cytoscape/js4cytoscape/tree/main/packages/ndex-client',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.npmjs.com/package/@js4cytoscape/ndex-client',
            label: 'npm',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/',
              },
              {
                label: 'API Reference',
                href: apiUrl,
                target: '_self'
              },
            ],
          },
          {
            title: 'NDEx Resources',
            items: [
              {
                label: 'NDEx Website',
                href: 'https://www.ndexbio.org',
              },
              {
                label: 'NDEx API Documentation',
                href: 'https://home.ndexbio.org/using-the-ndex-server-api/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/js4cytoscape/js4cytoscape',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} The Regents of the University of California, Cytoscape Consortium. All rights reserved. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json'],
      },
    }),

  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;