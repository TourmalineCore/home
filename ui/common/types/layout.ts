export interface LayoutData {
  headerContent: HeaderRedesignProps;
  footerContent: FooterRedesignProps;
}

export interface FooterRedesignProps {
  emailCaption: string;
  emailAddress: string;
  navigationLists: FooterNavigationItem[];
}

export interface FooterNavigationItem {
  id: number;
  caption: string;
  links: NavigationLink[];
}

export interface HeaderRedesignProps {
  navigationLists: HeaderNavigationItem[];
  buttonLabel: string;
  emailCaption: string;
  emailAddress: string;
  socialLinks: NavigationLink[];
}

export interface HeaderNavigationItem extends NavigationLink {
  navItems: NavigationLink[];
}

export interface NavigationLink {
  id: number;
  name: string;
  link: string;
}
