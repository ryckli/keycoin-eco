import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'KeyCoin — 后经济世代',
  description: '电力驱动的AI丰裕经济体系',

  bundler: viteBundler(),
  theme: defaultTheme({
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
  }),

  plugins: [
    markdownChartPlugin({
      mermaid: true,
    }),
  ],
})