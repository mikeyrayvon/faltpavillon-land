import { urlFor } from "utils/sanity";

export const imageUrl = (image, width, height) =>
  image
    ? urlFor(image)
        .auto("format")
        .width(width)
        .height(height)
        .dpr(2)
        .fit("scale")
        .url()
    : "";

export const filterDataToSingleItem = (data: any, preview: any) => {
  if (!Array.isArray(data)) {
    return data;
  }

  if (data.length === 1) {
    return data[0];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
};

export const padToTwoDigits = (num: number): string =>
  String(num).padStart(2, "0");

export const convertSecondsToMinutesAndSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${padToTwoDigits(minutes)}:${padToTwoDigits(remainingSeconds)}`;
};

export const mergeClasses = (classArray: (string | false | undefined)[]) => {
  const filteredArray = classArray.filter(Boolean);
  return filteredArray.join(" ");
};
