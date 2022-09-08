import { chakra, Heading, HTMLChakraProps } from '@chakra-ui/react'
import { StoryData } from '@storyblok/react'
import { Link } from '../Link'
import { TagList } from '../TagList'

const dateFormatter = Intl.DateTimeFormat('en-UK', {
  dateStyle: 'long',
})

export interface BlogPostListItemProps extends HTMLChakraProps<'article'> {
  story: StoryData
}

export function BlogPostListItem(props: BlogPostListItemProps) {
  const { story, ...rest } = props

  return (
    <chakra.article {...rest}>
      <header>
        <Heading size="lg">
          <Link href={story.full_slug}>{story.name}</Link>
        </Heading>
      </header>
      <footer>
        {story.tag_list.length !== 0 && (
          <>
            on <TagList tags={story.tag_list} /> |{' '}
          </>
        )}
        <time dateTime={story.published_at!}>
          {dateFormatter.format(new Date(story.first_published_at!))}
        </time>
      </footer>
    </chakra.article>
  )
}
