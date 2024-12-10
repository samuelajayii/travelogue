import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
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
      type: 'reference',
      to: [{ type: 'blogger' }],
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
      type: 'markdown',

    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image'}],
    }),
  ],
});
