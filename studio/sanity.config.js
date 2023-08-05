import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

console.log(process.env);

export default defineConfig([
  {
    name: "production-workspace",
    title: "Starter",
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
    basePath: "/production",
    document: {
      productionUrl: (prev, context) => {
        const { document } = context;

        if (document._type === "page") {
          // Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
          const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

          // Replace `remoteUrl` with your deployed Next.js site
          const remoteUrl = `https://website.com`;
          const localUrl = `http://localhost:3000`;

          const baseUrl =
            window.location.hostname === "localhost" ? localUrl : remoteUrl;

          const previewUrl = new URL(baseUrl);

          previewUrl.pathname = `/api/preview`;
          previewUrl.searchParams.append(`secret`, previewSecret);
          previewUrl.searchParams.append(`type`, document._type);
          const slug = document?.slug?.current;
          if (slug) {
            previewUrl.searchParams.append(`slug`, slug);
          }

          return previewUrl.toString();
        }

        return prev;
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
]);
