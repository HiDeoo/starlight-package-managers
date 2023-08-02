import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    starlight({
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-package-managers/edit/main/docs/',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', link: '/guides/getting-started/' },
            { label: 'Usage', link: '/guides/usage/' },
            { label: 'Package Managers', link: '/guides/package-managers/' },
          ],
        },
        { label: 'Demo', link: '/demo/' },
      ],
      social: {
        github: 'https://github.com/HiDeoo/starlight-package-managers',
      },
      title: 'Starlight Package Managers',
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
})
