import { urlFor } from "utils/sanity";
import { Image } from "utils/types";
import Container from "./Container";

const Images = ({
  images,
  defaultCaption = "Faltpavillon",
}: {
  images: Image[];
  defaultCaption: string;
}) => {
  return (
    <Container>
      <div className="flex flex-col items-center">
        {images.map((image) => {
          const { alt, caption, _key } = image;
          return (
            <figure className="mb-20 lg:mb-24 xl:mb-36" key={_key}>
              <img
                src={urlFor(image).url()}
                alt={alt ? alt : caption ? caption : defaultCaption}
              />
              {caption && (
                <figcaption className="text-white mt-2">{caption}</figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </Container>
  );
};

export default Images;
