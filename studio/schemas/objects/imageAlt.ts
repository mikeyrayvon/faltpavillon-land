export default {
  name: "imageAlt",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "alt",
    },
  },
};
