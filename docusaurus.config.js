// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mastering Phoenix',
  tagline: 'Guía completa para dominar el framework web de Elixir',
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
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
        title: 'Mastering Phoenix',
        logo: {
          alt: 'Phoenix Framework Logo',
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
          {to: '/blog', label: 'Blog', position: 'left'},
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
                label: 'Elixir Forum',
                href: 'https://elixirforum.com/c/phoenix-forum',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/elixir',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/elixirphoenix',
              },
            ],
          },
          {
            title: 'Más',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/phoenixframework/phoenix',
              },
              {
                label: 'Sitio Oficial',
                href: 'https://www.phoenixframework.org/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mastering Phoenix. Construido con Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
