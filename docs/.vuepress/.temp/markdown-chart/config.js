import { defineClientConfig } from "vuepress/client";
import Mermaid from "C:/Users/30348/Desktop/keycoin-site/node_modules/@vuepress/plugin-markdown-chart/dist/client/components/Mermaid.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Mermaid", Mermaid);
  },
});
