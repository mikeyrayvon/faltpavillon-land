// Import documents
import config from "./documents/config";
import page from "./documents/page";

// Import objects
import barePortableText from "./objects/barePortableText";
import figure from "./objects/figure";
import imageAlt from "./objects/imageAlt";
import internalLink from "./objects/internalLink";
import link from "./objects/link";
import portableText from "./objects/portableText";
import seoMeta from "./objects/seoMeta";
import simplePortableText from "./objects/simplePortableText";

// Then we give our schema to the builder and provide the result to Sanity
export default [
  /* Your types here! */
  barePortableText,
  config,
  figure,
  imageAlt,
  internalLink,
  link,
  page,
  portableText,
  seoMeta,
  simplePortableText,
];
