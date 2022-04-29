const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const general = await client.fetch(groq`
    *[_type == "general"][0]{
      ...,
      navigation{
        pages[]->{
          title,
          'slug': slug.current
        }
      },
      'siteTitle': defaultSeo.siteTitle,
      'description': defaultSeo.description,
      'previewImage': defaultSeo.previewImage.asset->url,
      'favicon': defaultSeo.favicon.asset->url
    }
  `);

  return general;
};
