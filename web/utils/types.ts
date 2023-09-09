export type Config = {
  siteTitle: string;
  siteUrl: string;
  siteDescription?: string;
  defaultOpenGraphImage?: Image;
  contactEmail?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
};

export type Store = {};

export type Image = {
  asset: {
    _ref: string;
  };
  caption?: string;
  alt?: string;
  _key: string;
};

export type SeoMeta = {
  description?: string;
  openGraphImage?: Image;
  includeInSitemap: boolean;
  disallowRobots: boolean;
};

export type Page = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};

export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
};
