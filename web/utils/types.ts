export type Config = {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  defaultOpenGraphImage?: Image;
};

export type Store = {};

export type Image = {
  asset: {
    _ref: string;
  };
};

export type SeoMeta = {
  description: string;
  openGraphImage: Image;
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
