export default {
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Title', value: 'title'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Emphasis', value: 'em'},
          {title: 'Strong', value: 'strong'},
        ],
        annotations: [{type: 'link'}, {type: 'internalLink'}],
      },
    },
    {type: 'figure'},
  ],
}
