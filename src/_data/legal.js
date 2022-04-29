const groq = require('groq');
const client = require('../utils/sanityClient');

module.exports = async function () {
  const legal = await client.fetch(groq`
    *[_type == "legal"][0]
  `);

  return legal;
};
