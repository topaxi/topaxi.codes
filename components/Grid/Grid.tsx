import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export const Grid = ({ blok }: { blok: any }) => {
  return (
    <div className="grid" {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
