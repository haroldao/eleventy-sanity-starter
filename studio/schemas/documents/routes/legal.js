import { FiFile } from 'react-icons/fi';

const name = 'legal';
const title = 'Legal';
const icon = FiFile;

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
      title: 'Disclaimer',
      name: 'disclaimer',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          description:
            'Is a unique part at the end of the URL, e.g. mywebsite.com/my-page',
          options: {
            source: 'disclaimer.title',
            maxLength: 200,
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
          },
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Text',
          name: 'text',
          type: 'portableText',
        },
      ],
    },
    {
      title: 'Privacy Policy',
      name: 'privacyPolicy',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          name: 'slug',
          type: 'slug',
          title: 'Slug',
          description:
            'Is a unique part at the end of the URL, e.g. mywebsite.com/my-page',
          options: {
            source: 'privacyPolicy.title',
            maxLength: 200,
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
          },
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Text',
          name: 'text',
          type: 'portableText',
        },
      ],
    },
  ],
  preview: {
    select: {
      imprint: 'disclaimer.title',
      privacy: 'privacyPolicy.title',
    },
    prepare({ imprint, privacy }) {
      return {
        title: `${imprint} & ${privacy}`,
        media: icon,
      };
    },
  },
};
