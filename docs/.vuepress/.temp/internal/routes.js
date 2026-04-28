export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/contrects.html", { loader: () => import(/* webpackChunkName: "contrects.html" */"C:/Users/30348/Desktop/keycoin-site/docs/contrects.md"), meta: {"title":"合约文档"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/30348/Desktop/keycoin-site/docs/README.md"), meta: {"title":""} }],
  ["/roadmap.html", { loader: () => import(/* webpackChunkName: "roadmap.html" */"C:/Users/30348/Desktop/keycoin-site/docs/roadmap.md"), meta: {"title":"路线图"} }],
  ["/whitepaper.html", { loader: () => import(/* webpackChunkName: "whitepaper.html" */"C:/Users/30348/Desktop/keycoin-site/docs/whitepaper.md"), meta: {"title":"后经济世代：电力驱动的AI丰裕经济体系白皮书"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/30348/Desktop/keycoin-site/docs/.vuepress/.temp/pages/404.html.vue"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  __VUE_HMR_RUNTIME__.updateRoutes?.(routes)
  __VUE_HMR_RUNTIME__.updateRedirects?.(redirects)
}

if (import.meta.hot) {
  import.meta.hot.accept((m) => {
    __VUE_HMR_RUNTIME__.updateRoutes?.(m.routes)
    __VUE_HMR_RUNTIME__.updateRedirects?.(m.redirects)
  })
}
