import { defineField, defineType } from 'sanity';

export const blogger = defineType({
    name: 'blogger',
    title: 'Blogger',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'number',
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
        }),
    ],
    preview: {
        select: {
            title: "name"
        }
    }
});
