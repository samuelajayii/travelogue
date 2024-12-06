import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'travelPost',
  title: 'Travel Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
        name: 'blogger',
        title: 'reference',
        to: {type: 'blogger'},
      }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (rule) => rule.required().error('Please enter a destination')
    }),
    defineField({
      name: 'date',
      title: 'Date of Travel',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (rule) => rule.required().error('Please tell us your experience')
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
});
