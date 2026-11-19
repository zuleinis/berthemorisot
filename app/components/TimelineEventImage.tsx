import React from "react";

export type TimelineImage = {
  src: string;
  alt: string;
  artist: string;
  year: string;
  title: string;
  collection: string;
  sourceUrl: string;
};

interface TimelineEventImageProps {
  image: TimelineImage;
}

export const TimelineEventImage = ({
  image: { src, alt, artist, year, title, collection, sourceUrl },
}: TimelineEventImageProps) => {
  return (
    <>
      <img src={src} alt={alt} className="max-h-[70vh] w-full object-contain" />

      <figcaption className="mt-3 max-w-md text-center text-sm text-gray-600">
        {artist} ({year}). <em>{title}</em> [Painting]. {collection}.{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-900"
        >
          View source
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </>
  );
};
