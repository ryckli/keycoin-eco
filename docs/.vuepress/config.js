import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'

export default defineUserConfig({
  base: '/keycoin-eco/',

  bundler: viteBundler(),

  // ========== 双语配置 ==========
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'KeyCoin — 后经济世代',
      description: '电力驱动的AI丰裕经济体系',
    },
    '/en/': {
      lang: 'en-US',
      title: 'KeyCoin — Post-Economy Era',
      description: 'AI-driven electricity-abundance economic system',
    },
  },

  theme: defaultTheme({
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        navbar: [
          { text: '白皮书', link: '/whitepaper' },
          { text: '合约', link: '/contracts' },
          { text: '路线图', link: '/roadmap' },
        ],
        sidebar: {
          '/': [
            {
              text: '文档',
              children: [
                '/README.md',
                '/whitepaper.md',
                '/contracts.md',
                '/roadmap.md',
              ],
            },
          ],
        },
      },
      '/en/': {
        selectLanguageName: 'English',
        navbar: [
          { text: 'Whitepaper', link: '/en/whitepaper' },
          { text: 'Contracts', link: '/en/contracts' },
          { text: 'Roadmap', link: '/en/roadmap' },
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Documents',
              children: [
                '/en/README.md',
                '/en/whitepaper.md',
                '/en/contracts.md',
                '/en/roadmap.md',
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
    mdEnhancePlugin({
      mermaid: true,
      katex: true,
    }),
  ],
})
