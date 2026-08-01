import highlight from "@comark/nuxt/plugins/highlight";
import toc from "@comark/nuxt/plugins/toc";
import { defineComarkComponent, defineComarkRendererComponent } from "@comark/vue";
import Announcement from "~/components/content/Announcement.vue";

const highlightPlugin = highlight({
  themes: { light: "monokai", dark: "monokai" },
});

export const articlePlugins = [highlightPlugin, toc({ depth: 3 })];

export const ArticleComark = defineComarkComponent({
  name: "ArticleComark",
  plugins: articlePlugins,
});

export const ArticleRenderer = defineComarkRendererComponent({
  name: "ArticleRenderer",
});

export const UsesComark = defineComarkComponent({
  name: "UsesComark",
  plugins: [highlightPlugin],
  components: { announcement: Announcement },
});
