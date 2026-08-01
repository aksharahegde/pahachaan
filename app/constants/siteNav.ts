export type SiteNavItem = {
  label: string;
  to: string;
  icon: string;
  testId: string;
};

export const desktopNav: SiteNavItem[] = [
  {
    label: "Work",
    to: "/projects",
    icon: "i-solar-code-square-linear",
    testId: "portfolio-work-nav-link",
  },
  {
    label: "Writing",
    to: "/blog",
    icon: "i-solar-document-text-linear",
    testId: "portfolio-writing-nav-link",
  },
  {
    label: "Resources",
    to: "/resources",
    icon: "i-solar-bookmark-linear",
    testId: "portfolio-toolkit-nav-link",
  },
  {
    label: "Photos",
    to: "/photos",
    icon: "i-solar-gallery-wide-linear",
    testId: "portfolio-photos-nav-link",
  },
  {
    label: "Uses",
    to: "/uses",
    icon: "i-solar-monitor-linear",
    testId: "portfolio-about-nav-link",
  },
];

export const primaryMobileNav: SiteNavItem[] = [
  {
    label: "Work",
    to: "/projects",
    icon: "i-solar-code-square-linear",
    testId: "portfolio-bottom-nav-work-link",
  },
  {
    label: "Writing",
    to: "/blog",
    icon: "i-solar-document-text-linear",
    testId: "portfolio-bottom-nav-writing-link",
  },
  {
    label: "Resources",
    to: "/resources",
    icon: "i-solar-bookmark-linear",
    testId: "portfolio-bottom-nav-resources-link",
  },
  {
    label: "Photos",
    to: "/photos",
    icon: "i-solar-gallery-wide-linear",
    testId: "portfolio-bottom-nav-photos-link",
  },
];

export const moreMobileNav: SiteNavItem[] = [
  {
    label: "Home",
    to: "/",
    icon: "i-solar-home-2-linear",
    testId: "portfolio-bottom-nav-more-home-link",
  },
  {
    label: "Uses",
    to: "/uses",
    icon: "i-solar-monitor-linear",
    testId: "portfolio-bottom-nav-more-uses-link",
  },
  {
    label: "Labs",
    to: "/labs",
    icon: "i-solar-test-tube-linear",
    testId: "portfolio-bottom-nav-more-labs-link",
  },
  {
    label: "Visitors",
    to: "/visitors",
    icon: "i-solar-global-linear",
    testId: "portfolio-bottom-nav-more-visitors-link",
  },
];

export function isNavItemActive(path: string, to: string): boolean {
  if (to === "/") {
    return path === "/";
  }

  return path === to || path.startsWith(`${to}/`);
}

export function isMoreNavActive(path: string): boolean {
  return moreMobileNav.some((item) => isNavItemActive(path, item.to));
}
