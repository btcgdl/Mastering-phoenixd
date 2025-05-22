// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Phoenixd',
  tagline: 'Servidor de pagos Bitcoin a través de la red Lightning',
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
    defaultLocale: 'es',
    locales: ['es'],
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
        title: 'Phoenixd',
        logo: {
          alt: 'Phoenixd Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
            to: '/intro',
          },
          {
            href: 'https://github.com/phoenixframework/phoenix',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              {
                label: 'Introducción',
                to: '/intro',
              },
              {
                label: 'Instalación',
                to: '/intro',
              },
              {
                label: 'Guías',
                to: '/intro',
              },
            ],
          },
          {
            title: 'Comunidad',
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
            title: 'Más',
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
        copyright: `Copyright © ${new Date().getFullYear()} Phoenixd - Servidor de pagos Bitcoin Lightning. Construido con Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
