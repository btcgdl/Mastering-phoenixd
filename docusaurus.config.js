// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mastering Phoenixd',
  tagline: 'Bitcoin payment server through the Lightning Network',
  // favicon: 'img/favicon.ico', // Ensure you have this file in static/img or remove/update path

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com', // TODO: Update this
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
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
          routeBasePath: '/', // Serve docs from the root
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Mastering Phoenixd',
        logo: {
          alt: 'Phoenixd Logo',
          src: 'img/lightning_logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
            to: '/intro',
          },
          {
            href: 'https://github.com/ACINQ/phoenixd',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: '<div style="width: 20px;"></div>', // Spacer
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/intro',
              },
              {
                label: 'Installation',
                to: '/intro',
              },
              {
                label: 'Guides',
                to: '/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Bitcoin Forum',
                href: 'https://bitcointalk.org/',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/lightning',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/lightning',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/your-repo/phoenixd',
              },
              {
                label: 'Lightning Network',
                href: 'https://lightning.network/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Phoenixd - Bitcoin Lightning Payment Server. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
