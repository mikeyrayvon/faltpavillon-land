import { urlFor } from "utils/sanity";
import { Image } from "utils/types";

const Images = ({
  images,
  defaultCaption = "Faltpavillon",
}: {
  images: Image[];
  defaultCaption: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      {images.map((image) => {
        const { alt, caption, _key } = image;
        return (
          <figure className="mb-36" key={_key}>
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
  );
};

export default Images;
