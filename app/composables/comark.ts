import highlight from "@comark/nuxt/plugins/highlight";
import toc from "@comark/nuxt/plugins/toc";
import { defineMarkdownComponent, defineMarkdownDocumentComponent } from "@comark/vue";
import Announcement from "~/components/content/Announcement.vue";

const highlightPlugin = highlight({
  themes: { light: "monokai", dark: "monokai" },
});

export const articlePlugins = [highlightPlugin, toc({ depth: 3 })];

export const ArticleComark = defineMarkdownComponent({
  name: "ArticleComark",
  plugins: articlePlugins,
});

export const ArticleRenderer = defineMarkdownDocumentComponent({
  name: "ArticleRenderer",
});

export const UsesComark = defineMarkdownComponent({
  name: "UsesComark",
  plugins: [highlightPlugin],
  components: { announcement: Announcement },
});
