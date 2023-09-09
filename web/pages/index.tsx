import { PortableText, getClient, usePreviewSubscription } from "utils/sanity";
import { configQuery, contentQuery, projectQuery } from "utils/queries";
import groq from "groq";

import Layout from "components/Layout";
import Seo from "components/Seo";
import Container from "components/Container";

import { filterDataToSingleItem } from "utils/helpers";
import { NextPage } from "next";
import ExitPreview from "components/ExitPreview";
import Link from "next/link";

const query = groq`
  *[_type == 'page' && slug.current == 'landing'][0] {
    ...,
    ${contentQuery},
  }
`;

export const getStaticProps = async ({
  preview = false,
}: {
  params: any;
  preview: boolean;
}) => {
  const config = await getClient().fetch(configQuery);
  const queryParams = { slug: "landing" };
  const data = await getClient(preview).fetch(query, queryParams);
  const projects = await getClient().fetch(projectQuery);

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
      projects,
    },
  };
};

const Landing: NextPage<{
  preview: boolean;
  data?: any;
  projects?: any;
}> = ({ preview, data, projects }) => {
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
      <Seo />
      <div className="pb-40">
        <Container>
          {projects && (
            <ul>
              {projects.map((project: any) => (
                <li key={project._id}>
                  <Link href={`/${project.slug}`} className="underline">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {doc && <PortableText value={doc.content} />}
        </Container>
      </div>
      {preview && <ExitPreview />}
    </Layout>
  );
};

export default Landing;
