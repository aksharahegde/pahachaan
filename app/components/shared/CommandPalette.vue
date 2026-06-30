<template>
  <UModal
    v-model:open="isCommandPaletteOpen"
    data-testid="portfolio-command-palette"
  >
    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        close
        :groups="groups"
        placeholder="Search pages, photos, projects, writing..."
        class="h-96"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
type CommandItem = {
  label: string;
  suffix?: string;
  icon?: string;
  onSelect?: (event?: Event) => void;
};

type CommandGroup = {
  id: string;
  label: string;
  items: CommandItem[];
};

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const colorMode = useColorMode();
const searchTerm = ref("");

const { isCommandPaletteOpen, closeCommandPalette, openCommandPalette } = useCommandPalette();

const { data: projects } = await useAsyncData("command-projects", () =>
  queryCollection("projects").all()
);

const { data: articles } = await useAsyncData("command-articles", () =>
  queryCollection("blog")
    .select("path", "title", "description", "published")
    .where("title", "<>", "Blog")
    .order("published", "DESC")
    .all()
);

const { data: resources } = await useAsyncData("command-resources", () =>
  queryCollection("resources").all()
);

const { data: photos } = await useAsyncData("command-photos", () =>
  queryCollection("photos").all()
);

const { data: contactData } = await useAsyncData("command-contact", () =>
  queryCollection("contact").first()
);

const { data: footerData } = await useAsyncData("command-footer", () =>
  queryCollection("footer").first()
);

const hasSearchTerm = computed(() => searchTerm.value.trim().length > 0);
const siteUrl = computed(() => config.public.baseURL || "");
const currentUrl = computed(() => `${siteUrl.value}${route.fullPath}`);

const getVisibleItems = (items: CommandItem[]) =>
  hasSearchTerm.value ? items : items.slice(0, 3);

const closeAndNavigate = async (to: string) => {
  closeCommandPalette();
  await router.push(to);
};

const closeAndOpen = (url?: string) => {
  if (!url) {
    return;
  }

  closeCommandPalette();
  window.open(url, "_blank", "noopener,noreferrer");
};

const copyText = async (text?: string) => {
  if (!text) {
    return;
  }

  closeCommandPalette();
  await navigator.clipboard?.writeText(text);
};

const getContactUrl = (name: string) =>
  contactData.value?.contact?.find((item) => item.name.toLowerCase() === name.toLowerCase())?.url;

const getEmailAddress = () => getContactUrl("Email")?.replace(/^mailto:/, "");

const getDisplayUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname === "/" ? "" : parsedUrl.pathname.replace(/\/$/, "");

    return `${parsedUrl.hostname.replace(/^www\./, "")}${pathname}`;
  } catch {
    return url;
  }
};

const selectRandom = <T,>(items: T[]) => {
  if (!items.length) {
    return undefined;
  }

  return items[Math.floor(Math.random() * items.length)];
};

const toggleColorMode = () => {
  closeCommandPalette();
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const pageCommands = computed<CommandItem[]>(() => [
  { label: "Home", suffix: "/", icon: "i-solar-home-2-linear", onSelect: () => closeAndNavigate("/") },
  { label: "Photos", suffix: "/photos", icon: "i-solar-gallery-wide-linear", onSelect: () => closeAndNavigate("/photos") },
  { label: "Projects", suffix: "/projects", icon: "i-solar-code-square-linear", onSelect: () => closeAndNavigate("/projects") },
  { label: "Writing", suffix: "/blog", icon: "i-solar-document-text-linear", onSelect: () => closeAndNavigate("/blog") },
  { label: "Resources", suffix: "/resources", icon: "i-solar-bookmark-linear", onSelect: () => closeAndNavigate("/resources") },
  { label: "Uses", suffix: "/uses", icon: "i-solar-monitor-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Labs", suffix: "/labs", icon: "i-solar-test-tube-linear", onSelect: () => closeAndNavigate("/labs") },
  { label: "Visitors", suffix: "/visitors", icon: "i-solar-global-linear", onSelect: () => closeAndNavigate("/visitors") },
]);

const projectCommands = computed<CommandItem[]>(() =>
  (projects.value || []).map((project) => ({
    label: project.heading || project.title,
    suffix: project.description,
    icon: "i-solar-arrow-right-up-linear",
    onSelect: () => closeAndOpen(project.url),
  }))
);

const articleCommands = computed<CommandItem[]>(() =>
  (articles.value || []).map((article) => ({
    label: article.title,
    suffix: article.description,
    icon: "i-solar-document-text-linear",
    onSelect: () => closeAndNavigate(article.path),
  }))
);

const resourceCommands = computed<CommandItem[]>(() =>
  (resources.value || []).flatMap((resource) =>
    resource.links.map((link) => ({
      label: link.title || getDisplayUrl(link.url),
      suffix: resource.tag,
      icon: "i-solar-link-linear",
      onSelect: () => closeAndOpen(link.url),
    }))
  )
);

const photoCategoryCommands = computed<CommandItem[]>(() =>
  (photos.value || []).map((group) => ({
    label: group.title,
    suffix: `${group.photos.length} photos`,
    icon: "i-solar-gallery-wide-linear",
    onSelect: () => closeAndNavigate(`/photos#${group.slug}`),
  }))
);

const usesCommands = computed<CommandItem[]>(() => [
  { label: "Uses", suffix: "Daily setup", icon: "i-solar-monitor-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Workstation links", suffix: "Hardware and setup", icon: "i-solar-monitor-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "AI tools", suffix: "Claude, Cursor, Opencode", icon: "i-solar-command-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Design tools", suffix: "Open Design, Figma, Picsart, Tldraw", icon: "i-solar-palette-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Notes tools", suffix: "Obsidian, Tolaria", icon: "i-solar-notebook-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Browser tools", suffix: "Zen, Brave, Chrome", icon: "i-solar-window-frame-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Terminal tools", suffix: "cmux, ghostty", icon: "i-solar-terminal-linear", onSelect: () => closeAndNavigate("/uses") },
  { label: "Audio gear", suffix: "Headphones, speakers, amplifier", icon: "i-solar-headphones-round-linear", onSelect: () => closeAndNavigate("/uses") },
]);

const contactCommands = computed<CommandItem[]>(() =>
  (contactData.value?.contact || []).map((item) => ({
    label: item.name === "Email" ? "Open email client" : `Open ${item.name}`,
    suffix: item.url,
    icon: item.icon,
    onSelect: () => closeAndOpen(item.url),
  }))
);

const utilityCommands = computed<CommandItem[]>(() => [
  { label: "Copy current page link", suffix: currentUrl.value, icon: "i-solar-copy-linear", onSelect: () => copyText(currentUrl.value) },
  { label: "Copy site link", suffix: siteUrl.value || "/", icon: "i-solar-copy-linear", onSelect: () => copyText(siteUrl.value || window.location.origin) },
  { label: "Copy email", suffix: getEmailAddress(), icon: "i-simple-icons-minutemailer", onSelect: () => copyText(getEmailAddress()) },
  { label: "Open source repository", suffix: footerData.value?.github, icon: "i-simple-icons-github", onSelect: () => closeAndOpen(footerData.value?.github) },
  { label: "Open llms.txt", suffix: "/llms.txt", icon: "i-solar-document-text-linear", onSelect: () => closeAndOpen(`${siteUrl.value}/llms.txt`) },
  { label: "Open sitemap", suffix: "/sitemap.xml", icon: "i-solar-map-linear", onSelect: () => closeAndOpen(`${siteUrl.value}/sitemap.xml`) },
  { label: "Open RSS feed", suffix: "/rss.xml", icon: "i-solar-rss-linear", onSelect: () => closeAndOpen(`${siteUrl.value}/rss.xml`) },
]);

const appearanceCommands = computed<CommandItem[]>(() => [
  {
    label: "Toggle light/dark",
    suffix: colorMode.value === "dark" ? "Switch to light" : "Switch to dark",
    icon: colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
    onSelect: toggleColorMode,
  },
]);

const randomCommands = computed<CommandItem[]>(() => [
  {
    label: "Go to random project",
    icon: "i-solar-shuffle-linear",
    onSelect: () => closeAndOpen(selectRandom(projects.value || [])?.url),
  },
  {
    label: "Go to random article",
    icon: "i-solar-shuffle-linear",
    onSelect: () => {
      const article = selectRandom(articles.value || []);

      if (article?.path) {
        closeAndNavigate(article.path);
      }
    },
  },
  {
    label: "Go to random resource",
    icon: "i-solar-shuffle-linear",
    onSelect: () => {
      const resourceLinks = (resources.value || []).flatMap((resource) => resource.links);
      closeAndOpen(selectRandom(resourceLinks)?.url);
    },
  },
]);

const groups = computed<CommandGroup[]>(() =>
  [
    { id: "pages", label: "Pages", items: getVisibleItems(pageCommands.value) },
    { id: "photos", label: "Photos", items: getVisibleItems(photoCategoryCommands.value) },
    { id: "projects", label: "Projects", items: getVisibleItems(projectCommands.value) },
    { id: "writing", label: "Writing", items: getVisibleItems(articleCommands.value) },
    { id: "resources", label: "Resources", items: getVisibleItems(resourceCommands.value) },
    { id: "uses", label: "Uses", items: getVisibleItems(usesCommands.value) },
    { id: "contact", label: "Contact", items: getVisibleItems(contactCommands.value) },
    { id: "utilities", label: "Utilities", items: getVisibleItems(utilityCommands.value) },
    { id: "appearance", label: "Appearance", items: getVisibleItems(appearanceCommands.value) },
    { id: "random", label: "Random", items: getVisibleItems(randomCommands.value) },
  ].filter((group) => group.items.length)
);

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

watch(isCommandPaletteOpen, (isOpen) => {
  if (!isOpen) {
    searchTerm.value = "";
  }
});
</script>
