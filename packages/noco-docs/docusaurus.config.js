// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ClairView",
  tagline: "The Open Source Airtable Alternative",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.clairview.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "clairview", // Usually your GitHub org/user name.
  projectName: "clairview", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    "docusaurus-plugin-sass",
    "plugin-image-zoom",
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.startsWith('/0.109.7/')) {
            return [
              existingPath.replace('/0.109.7/', '/'),
            ];
          }
        },
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          editUrl:
            "https://github.com/digitranslab/clairview/tree/develop/packages/noco-docs/",
          lastVersion: "current",
          versions: {
            current: {
              label: "Latest",
            },
            "0.109.7": {
              label: "0.109.7 - Old UI",
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],

  themes: ['docusaurus-theme-search-typesense'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      typesense: {
        // Replace this with the name of your index/collection.
        // It should match the "index_name" entry in the scraper's "config.json" file.
        typesenseCollectionName: 'clairview-oss-docs-index',

        typesenseServerConfig: {
          nodes: [
            {
              host: 'rqf5uvajyeczwt3xp-1.a1.typesense.net',
              port: 443,
              protocol: 'https',
            }
          ],
          apiKey: 'lNKDTZdJrE76Sg8WEyeN9mXT29l1xq7Q',
        },

        // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
        typesenseSearchParameters: {},

        // Optional
        contextualSearch: true,
      },
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "",
        logo: {
          alt: "ClairView",
          src: "img/clairview-full-color.png",
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://clairview.com/?utm_source=docs&utm_medium=docs&utm_campaign=docs&utm_content=docs",
            html: "Join ClairView Cloud For FREE",
            position: "right",
            className: "header-join-link",
          },
          {
            href: "https://clairview.com/?utm_source=docs&utm_medium=docs&utm_campaign=docs&utm_content=docs",
            html: "Join ClairView Cloud",
            position: "right",
            className: "header-join-link-medium",
          },
          {
            href: "https://github.com/digitranslab/clairview",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "ClairView",
          src: "img/icon.png",
          width: 50,
        },
        links: [
          {
            label: "Join ClairView Cloud For FREE",
            href: "https://clairview.com/?utm_source=docs&utm_medium=docs&utm_campaign=docs&utm_content=docs",
            className: "footer-join-link",
          },
          {
            label: "GitHub",
            href: "https://github.com/digitranslab/clairview",
          },
          {
            label: "Website",
            href: "https://clairview.com/",
          },
          {
            label: "Community",
            href: "https://community.clairview.com/",
          },
          {
            label: "Discord",
            href: "https://discord.gg/5RgZmkW",
          },
          {
            label: "Twitter",
            href: "https://twitter.com/clairview",
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Digitrans Inc`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      imageZoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: '.markdown :not(em) > * > img',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        options: {
          margin: 96,
          background: "rgba(0,0,0,0.25)",
          scrollOffset: 0,
          // container: "#zoom-container",
          // template: "#zoom-template",
        },
      },
    }),
  clientModules: [require.resolve("./src/modules/tele.js"), require.resolve("./src/modules/maintenance.js")],
};

module.exports = config;
