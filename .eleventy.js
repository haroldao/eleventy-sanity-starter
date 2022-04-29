const { toHTML, escapeHTML } = require('@portabletext/to-html');
const htm = require('htm');
const vhtml = require('vhtml');
const builder = require("./src/utils/imageUrl");
const fs = require("fs");


function generateSrcImgSrc(asset) {
  const WIDTHS =  [600, 1200, 2400];

  return WIDTHS.map(function (width) {
    return `${builder
      .image(asset)
      .width(width)
      .auto("format")
      .fit("max")
      .url()} ${width}w`;
    });
}

function sanityImage(asset, alt="Image") {
  const srcSet = generateSrcImgSrc(asset);
  const defaultSrcSet = srcSet.join(',');
  const dimensions = asset.split('-')[1].split('x');
  const width = dimensions[0];
  const height = dimensions[1].split('.')[0];

  return `
    <img
      class="lazyload"
      width="${width}"
      height="${height}"
      src="${builder.image(asset).width(100).blur(50).url()}"
      data-src="${builder.image(asset).url()}"
      data-srcset="${defaultSrcSet}" 
      data-sizes="auto"
      alt="${alt}"
    />
  `;
}

function sanityBgImage(asset) {
  const srcSet = generateSrcImgSrc(asset);
  const defaultSrcSet = srcSet.join(',');

  return `
    <div 
      class="bg-img lazyload"
      style="background-image: url(${builder.image(asset).width(100).blur(50).url()})"
      data-bgset="${defaultSrcSet}" 
      data-sizes="auto"
    >
  `;
}


function transformDate(dateObj) {
  const date = new Date(dateObj);
  return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
}

function filterBlocksToHtml(blocks) {
  const html = htm.bind(vhtml)

    const portableTextComponents = {
      // types: {
      //   image: ({value}) => html`<img src="${value.imageUrl}" />`,
      //   callToAction: ({value, isInline}) =>
      //     isInline
      //       ? html`<a href="${value.url}">${value.text}</a>`
      //       : html`<div class="callToAction">${value.text}</div>`,
      // },
      marks: {
        pageLink: ({ children, value }) => {
          const href = value.pageSlug || ''
          return html`<a href="/${href}">${children}</a>`
        },
        externalLink: ({ children, value }) => {
          const href = value.href || ''
          const looksSafe = /^(http|https|mailto):/i.test(href)
          return looksSafe ? `<a href="${escapeHTML(value.href)}" target="_blank" rel="noopener noreferrer">${children}</a>` : children      
        },
      },
   }

  return toHTML(html`${blocks}`, { components: portableTextComponents })
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': '/assets' });

  eleventyConfig.addWatchTarget('./public/main.js');
  eleventyConfig.addWatchTarget('./public/index.css');
  
  eleventyConfig.addShortcode('img', sanityImage);
  eleventyConfig.addShortcode('bgImg', sanityBgImage);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addFilter('richtext', filterBlocksToHtml);
  eleventyConfig.addFilter('readableDate', transformDate);
  eleventyConfig.addFilter('split', (string, param) => {
    const newString = string.split(param);
    return newString;
  });
  
  eleventyConfig.setBrowserSyncConfig({
    notify: true,
    files: ['./public/main.js', './public/index.css'],
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('./public/404/index.html');
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'public'
    },
  }
};