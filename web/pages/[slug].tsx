import {
  PortableText,
  getClient,
  usePreviewSubscription,
} from "../utils/sanity";
import groq from "groq";
import { configQuery } from "../utils/queries";
import type { NextPage } from "next";
import Seo from "../components/Seo";
import Layout from "../components/Layout";
import { Post as DocType } from "../utils/types";
import { filterDataToSingleItem } from "../utils/helpers";
import ExitPreview from "components/ExitPreview";
import Container from "components/Container";

const query = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    ...,
  }
`;

export const getStaticPaths = async () => {
  const routes = await getClient().fetch(`*[_type == 'page'][].slug.current`);

  return {
    paths: routes.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
  preview = false,
}: {
  params: any;
  preview: boolean;
}) => {
  const config = await getClient().fetch(configQuery);
  const queryParams = { slug: params.slug };
  const data = await getClient(preview).fetch(query, queryParams);

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true };

  // Helper function to reduce all returned documents down to just one
  const doc = filterDataToSingleItem(data, preview);

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { doc, query, queryParams },
      config,
    },
  };
};

const Page: NextPage<{
  preview: boolean;
  data?: any;
}> = ({ preview, data }) => {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.doc,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  });

  // Client-side uses the same query, so we may need to filter it down again
  const doc = filterDataToSingleItem(previewData, preview);

  return (
    <Layout>
      <Seo doc={doc} />
      {doc && (
        <div className="pb-40">
          <Container>
            <h1 className="text-4xl font-bold">{doc.title}</h1>
            <PortableText value={doc.content} />
          </Container>
        </div>
      )}
      {preview && <ExitPreview />}
    </Layout>
  );
};

export default Page;
