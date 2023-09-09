export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'seoMeta',
      title: 'SEO & Metadata',
      type: 'seoMeta',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'figure'}],
    },
  ],

  initialValue: {
    seoMeta: {
      _type: 'seoMeta',
      includeInSitemap: true,
      disallowRobots: false,
    },
  },

  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
}
