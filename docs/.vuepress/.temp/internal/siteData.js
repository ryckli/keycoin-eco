export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"KeyCoin — 后经济世代\",\"description\":\"电力驱动的AI丰裕经济体系\",\"head\":[],\"locales\":{\"/\":{\"lang\":\"zh-CN\",\"title\":\"KeyCoin — 后经济世代\",\"description\":\"电力驱动的AI丰裕经济体系\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updateSiteData?.(siteData)
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updateSiteData?.(m.siteData)
  })
}
