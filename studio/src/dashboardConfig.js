const title = 'Client';
const apiId = 'abc';
const buildHookId = 'https://api.netlify.com/build_hooks/abc';
const name = 'client';
const url = 'https://client.de/';

export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'Netlify deploys',
        description:
          'Because these sites are static builds, they need to be re-deployed to see the changes when documents are published. You can check if the build was successful.',
        sites: [
          {
            title,
            apiId,
            buildHookId,
            name,
            url,
          },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
  ],
};
