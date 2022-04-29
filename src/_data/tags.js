const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const tags = await client.fetch(groq`
    *[_type == "category"][]{
      title
    }
  `);

  return tags;
};
