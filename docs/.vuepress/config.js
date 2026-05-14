import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export default defineUserConfig({
  base: '/',

  head: [
    ['meta', { name: 'description', content: 'Key Coin — 1:1 锚定每日发电量。电力即货币，创造即收益。' }],
    ['meta', { property: 'og:title', content: 'KeyCoin — 后经济世代' }],
    ['meta', { property: 'og:description', content: '电力即货币，创造即收益 — 1:1 锚定每日发电量，打破债务循环' }],
    ['meta', { property: 'og:image', content: '/keycoin-eco/keycoin-logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', href: '/keycoin-eco/keycoin-logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'KeyCoin — 后经济世代',
      description: '电力即货币，创造即收益 — 1:1 锚定每日发电量，打破债务循环',
    },
    '/en/': {
      lang: 'en-US',
      title: 'KeyCoin — Post-Economic Era',
      description: 'Power is Money, Creation is Income — 1:1 pegged to daily power generation',
    },
  },

  bundler: viteBundler(),

  extendsMarkdown: (md) => {
    md.use(require('markdown-it-katex'), { throwOnError: false, errorColor: '#cc0000' })
  },

  theme: defaultTheme({
    logo: '/keycoin-eco/keycoin-logo.png',
    repo: 'ryckli/keycoin-eco',
    docsDir: 'docs',
    darkMode: false,
    colorMode: 'dark',
    colorModeSwitch: false,
    locales: {
      '/': {
        selectLanguageName: '中文',
        editLink: false,
        lastUpdated: false,
        navbar: [
          { text: '首页', link: '/' },
          { text: '白皮书', link: '/whitepaper.html' },
          { text: '代币', link: '/token.html' },
          { text: '技术', link: '/tech.html' },
          { text: '治理', link: '/governance.html' },
          { text: '路线图', link: '/roadmap.html' },
          { text: 'FAQ', link: '/faq.html' },
        ],
        sidebar: {
          '/': [
            {
              text: '文档',
              children: [
                '/README.md',
                '/whitepaper.md',
                '/token.md',
                '/tech.md',
                '/governance.md',
                '/roadmap.md',
                '/faq.md',
              ],
            },
          ],
        },
      },
      '/en/': {
        selectLanguageName: 'English',
        editLink: false,
        lastUpdated: false,
        navbar: [
          { text: 'Home', link: '/en/' },
          { text: 'Whitepaper', link: '/en/whitepaper.html' },
          { text: 'Token', link: '/en/token.html' },
          { text: 'Tech', link: '/en/tech.html' },
          { text: 'Governance', link: '/en/governance.html' },
          { text: 'Roadmap', link: '/en/roadmap.html' },
          { text: 'FAQ', link: '/en/faq.html' },
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Docs',
              children: [
                '/en/README.md',
                '/en/whitepaper.md',
                '/en/token.md',
                '/en/tech.md',
                '/en/governance.md',
                '/en/roadmap.md',
                '/en/faq.md',
              ],
            },
          ],
        },
      },
    },
  }),

  plugins: [
    markdownChartPlugin({
      mermaid: true,
    }),
  ],
})
