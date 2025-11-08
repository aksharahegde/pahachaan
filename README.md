# Pahachaan

### Personal portfolio site template for all kind of techies - fully customizable via Nuxt Studio.

#### Preview

![Landing page](https://aksharahegde.xyz/screenshot.png)

#### Performance

![Performance](/public/performance.png)

## Features

A minimal, content-driven template for personal portfolios that's free to use.

- **100% Content-Driven**: All personal data managed through the `/content/` directory
- **Nuxt Studio Compatible**: Full support for [Nuxt Studio](https://nuxt.studio/) - edit content visually without touching code
- **Fully Responsive**: Adaptive navbar and layout that works on all devices
- **Dynamic Content**: Automatically displays latest blog articles on homepage
- **Flexible Contact Links**: Social media profile links loaded from content
- **Light & Dark Mode**: Built-in theme switching
- **SEO Optimized**: 100% SEO compatible with dynamic OG images for social media
- **MDC Syntax**: Use Vue components directly in Markdown files

## Quick Start

### 1. Fork & Clone

Click the `Use this template` button or fork this repository, then clone it:

```bash
git clone <your-repo-url>
cd pahachaan
```

### 2. Install Dependencies

```bash
bun install
# or npm install / pnpm install / yarn install
```

NOTE: This project uses Bun as the package manager.
You can use npm, pnpm, or yarn if you prefer. You can safely delete bun.lock which is stale.

### 3. Configure Environment

Create a `.env` file with the following variables:

```bash
# Your site URL
NUXT_PUBLIC_SITE_URL=https://yoursite.com

# Your name
OWNER_NAME=Your Name

# Openstatus widget slug (optional - for uptime monitoring)
STATUS_SITE_SLUG=your-slug

# Twitter handle (optional)
TWITTER_HANDLE=@yourhandle

# For Nuxt Studio integration (optional)
STUDIO_GITHUB_OWNER=your-github-username
STUDIO_GITHUB_REPO=your-repo-name
STUDIO_GITHUB_BRANCH_NAME=main
```

### 4. Start Development Server

```bash
bun dev
```

Visit `http://localhost:3000` to see your site!

## Content Structure

All personal content is managed through the `/content/` directory. Edit these files to customize your portfolio:

### Core Configuration Files

#### `content/home.json`

Your homepage hero section:

```json
{
  "name": "Your Name",
  "pronouns": "she/her",
  "title": "Your Professional Title",
  "bio": "Your bio description..."
}
```

#### `content/seo.json`

SEO metadata and site configuration:

```json
{
  "code": "seo",
  "headline": "Hello, I'm",
  "title": "Your Name | Title",
  "description": "Your site description...",
  "coverImage": "/avatar.jpg",
  "theme": "#374151",
  "colorMode": "dark"
}
```

#### `content/contact.json`

Social links displayed on homepage:

```json
{
  "contact": [
    {
      "name": "Github",
      "icon": "i-simple-icons-github",
      "url": "https://github.com/yourusername"
    },
    {
      "name": "LinkedIn",
      "icon": "i-simple-icons-linkedin",
      "url": "https://linkedin.com/in/yourusername"
    }
  ]
}
```

**Available Icons**: Use any icon from [Iconify](https://icon-sets.iconify.design/) with the format `i-{collection}-{icon}`

#### `content/footer.json`

Footer configuration and affiliate section:

```json
{
  "title": "Footer",
  "github": "https://github.com/yourusername/repo",
  "blog": "https://yourblog.com",
  "linkedin": "https://linkedin.com/in/yourusername",
  "twitter": "https://x.com/yourhandle",
  "affiliate": {
    "title": "Affiliate Title",
    "description": "Affiliate description",
    "url": "https://affiliate-link.com"
  }
}
```

### Content Pages

#### `content/index.md`

Homepage announcement using MDC component:

```markdown
---
title: "Home"
---

## ::announcement

title: "Your Announcement Title"
description: "Announcement description"
url: "https://your-link.com"
image: "https://your-image.png"

---

::
```

#### `content/uses.md`

Your tech stack and tools:

```markdown
---
title: "Uses"
description: "My daily tech setup and tools"
icon: "solar:monitor-smartphone-outline"
---

##### Workstation

- Your laptop
- Your monitor
  ...
```

#### `content/resources.md`

Resources and guides you want to share:

```markdown
---
title: "Resources"
description: "Collection of free resources"
icon: "solar:bookmark-linear"
---

Your content here...
```

### Collections

#### `content/projects/*.json`

Individual project entries:

```json
{
  "title": "Project Name",
  "url": "https://project-url.com",
  "thumbnail": "/projects/logo/project.png",
  "thumbnailBg": "bg-gray-900",
  "thumbnailAlt": "Project logo",
  "category": "development",
  "heading": "Project Title",
  "description": "Project description",
  "status": "active",
  "role": "Author"
}
```

**Status Options**: `active`, `wip`, `completed`, `abandoned`

#### `content/projects/index.json`

Projects page metadata:

```json
{
  "title": "Projects",
  "description": "Your projects description",
  "icon": "solar:folder-with-files-outline"
}
```

#### `content/blog/*.md`

Blog posts with frontmatter:

```markdown
---
title: "Post Title"
description: "Post description"
published: "2024-01-01"
path: "/blog/post-slug"
cover: "/blog/cover.png"
thumbnail: "/blog/thumbnails/thumb.png"
---

Your blog content here...
```

#### `content/shop/*.json`

Shop items or products:

```json
{
  "title": "Product Name",
  "icon": "solar:shop-2-outline",
  "url": "https://product-url.com",
  "category": "templates",
  "heading": "Product Heading",
  "description": "Product description"
}
```

## Editing with Nuxt Studio

[Nuxt Studio](https://nuxt.studio/) provides a visual interface to edit your content without touching code.

### Setup Nuxt Studio

1. Visit [nuxt.studio](https://nuxt.studio/) and sign in with GitHub
2. Import your repository
3. Configure the GitHub integration variables in your `.env` file
4. Start editing visually!

### Editing Content

- **Visual Editor**: Edit markdown files with a WYSIWYG interface
- **MDC Components**: Insert components like `::announcement` directly in the editor
- **Live Preview**: See changes in real-time
- **Git Integration**: Changes are committed directly to your repository

## Customization

### Adding New Projects

Create a new JSON file in `content/projects/` with a number prefix (e.g., `18.myproject.json`):

```json
{
  "title": "My New Project",
  "url": "https://example.com",
  "thumbnail": "/projects/logo/myproject.png",
  "thumbnailBg": "bg-blue-500",
  "thumbnailAlt": "My project logo",
  "category": "development",
  "heading": "My Project",
  "description": "Description of my project",
  "status": "active",
  "role": "Creator"
}
```

### Adding Blog Posts

Create a new markdown file in `content/blog/`:

```markdown
---
title: "My Blog Post"
description: "Post description"
published: "2024-11-08"
path: "/blog/my-blog-post"
cover: "/blog/my-post.png"
thumbnail: "/blog/thumbnails/my-post.png"
---

# My Blog Post

Your content here...
```

### Modifying Contact Links

Edit `content/contact.json` to add, remove, or modify social links. Find icons at [Iconify](https://icon-sets.iconify.design/).

### Changing Colors and Theme

Edit `content/seo.json` to change the theme color and default color mode.

## Deployment

Nuxt supports various hosting platforms:

- **Vercel**: Zero-config deployment
- **Netlify**: Automatic builds from Git
- **Cloudflare Pages**: Edge deployment
- **And more**: Check [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - Vue.js Framework
- [Nuxt Content 3](https://content.nuxt.com/) - File-based CMS
- [Nuxt UI](https://ui.nuxt.com/) - UI Component Library
- [Nuxt Studio](https://nuxt.studio/) - Visual Content Editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [VueUse](https://vueuse.org/) - Vue Composition Utilities

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Commit: `git commit -am 'Add new feature'`
5. Push: `git push origin feature/my-feature`
6. Open a Pull Request to the `develop` branch

For bugs and feature requests, please [open an issue](https://github.com/aksharahegde/pahachaan/issues).

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Original inspiration: [Fayaz Ahmed's Zooper template](https://github.com/fayazara)
- Built with love using Nuxt and Nuxt Content

---

**Made with ❤️ for the dev community. Feel free to fork, customize, and make it your own!**
