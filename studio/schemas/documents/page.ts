export default {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "seoMeta",
      title: "SEO & Metadata",
      type: "seoMeta",
    },
    {
      name: "content",
      title: "Content",
      type: "portableText",
    },
  ],

  initialValue: {
    seoMeta: {
      _type: "seoMeta",
      includeInSitemap: true,
      disallowRobots: false,
    },
  },

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
};
