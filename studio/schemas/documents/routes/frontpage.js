import { FiLayout } from 'react-icons/fi';

const name = 'frontpage';
const title = 'Frontpage';
const icon = FiLayout;

export default {
  type: 'document',
  name,
  title,
  icon,
  initialValue: {
    title,
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'lang',
      type: 'localeString',
      title: 'Lang',
    },
    {
      name: 'description',
      type: 'localePortableText',
      title: 'Description',
      description: 'Create paragraphs with the key combination: shift + enter',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'media',
      type: 'media',
      title: 'Media',
    },
    {
      name: 'video',
      type: 'mux.video',
      title: 'Video',
    },
    {
      title: 'Filter',
      name: 'filter',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Categories',
      name: 'category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      previewTitle: 'title',
    },
    prepare({ previewTitle }) {
      return {
        title: previewTitle,
        media: icon,
      };
    },
  },
};
