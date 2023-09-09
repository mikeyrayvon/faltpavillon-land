import groq from "groq";

export const configQuery = groq`
  *[_id == "config"][0] {
    ...
  }
`;

export const contentQuery = groq`
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        _key,
        "slug": @->slug.current
      }
    }
  }
`;

export const projectQuery = groq`
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
  }
`;
