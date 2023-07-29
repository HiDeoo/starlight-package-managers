import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-package-managers/edit/main/example/',
      },
      sidebar: [
        { label: 'Getting Started', link: '/guides/getting-started/' },
        { label: 'Usage', link: '/guides/usage/' },
      ],
      social: {
        github: 'https://github.com/HiDeoo/starlight-package-managers',
      },
      title: 'Starlight Package Managers',
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
})
