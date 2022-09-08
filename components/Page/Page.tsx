import { storyblokEditable, StoryblokComponent } from '@storyblok/react'

export const Page = ({ blok }: { blok: any }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
)
