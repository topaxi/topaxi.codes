import { storyblokEditable } from "@storyblok/react";

export const Teaser = ({ blok }: { blok: any }) => {
  return <h2 {...storyblokEditable(blok)}>{blok.headline}</h2>;
};
