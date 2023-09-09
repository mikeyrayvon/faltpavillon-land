import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'

export default defineConfig([
  {
    name: 'production-workspace',
    title: 'Faltpavillon',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    basePath: '/production',
    document: {
      /*productionUrl: (prev, context) => {
        const {document} = context

        if (document._type === 'page') {
          // Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
          const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET

          // Replace `remoteUrl` with your deployed Next.js site
          const remoteUrl = `https://website.com`
          const localUrl = `http://localhost:3000`

          const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

          const previewUrl = new URL(baseUrl)

          previewUrl.pathname = `/api/preview`
          previewUrl.searchParams.append(`secret`, previewSecret)
          previewUrl.searchParams.append(`type`, document._type)
          const slug = document?.slug?.current
          if (slug) {
            previewUrl.searchParams.append(`slug`, slug)
          }

          return previewUrl.toString()
        }

        return prev
      },*/
      productionUrl: async (prev, context) => {
        // context includes the client an other details
        const {getClient, dataset, document} = context
        const client = getClient({apiVersion: '2023-05-31'})

        if (document._type === 'page') {
          // you can now use async/await 🎉
          const slug = await client.fetch(
            `*[_type == 'routeInfo' && page._ref == $postId][0].slug.current`,
            {postId: document._id}
          )

          const params = new URLSearchParams()
          params.set('preview', 'true')
          params.set('dataset', dataset)

          const remoteUrl = `https://website.com`
          const localUrl = `http://localhost:3000`

          const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

          return `${baseUrl}/${slug}?${params}`
        }

        return prev
      },
    },
    plugins: [
      deskTool({
        structure: deskStructure,
      }),
      visionTool(),
    ],
    schema: {
      types: schemas,
    },
  },
])
