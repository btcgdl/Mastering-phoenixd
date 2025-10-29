import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mastering Phoenixd',
  tagline: 'Bitcoin payment server through the Lightning Network',
  // favicon: 'img/favicon.ico', // Ensure you have this file in static/img or remove/update path

  // Set the production url of your site here
  url: 'https://btcgdl.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Mastering-phoenixd/',

  organizationName: 'btc-gdl', // Usually your GitHub org/user name.
  projectName: 'Mastering-Phoenixd', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    path: 'i18n',
    localeConfigs: {
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-ES',
        calendar: 'gregory'
      },
    },
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
            to: '/Install',
          },/*
          {
            type: 'localeDropdown',
            position: 'right',
          },*/
          {
            href: 'https://github.com/btcgdl/Mastering-phoenixd',
            label: 'GitHub',
            position: 'right',
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
                to: '/',
              },
              {
                label: 'Installation',
                to: '/Script',
              },
              {
                label: 'Guides',
                to: '/Script',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Bitcoin GDL',
                href: 'https://btcgdl.com/',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/btc.gdl/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/btc_ln_gdl',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/btcgdl',
              },
              {
                label: 'Lightning Network?',
                href: 'https://en.wikipedia.org/wiki/Lightning_Network',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} BTC GDL - Bitcoin Lightning Payment Server. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.oceanicNext,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
