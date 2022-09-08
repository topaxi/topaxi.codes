import { storyblokEditable } from '@storyblok/react'

export const Feature = ({ blok }: { blok: any }) => (
  <div className="column feature" {...storyblokEditable(blok)}>
    {blok.name}
  </div>
)
