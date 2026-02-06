import { Container, Heading } from '@chakra-ui/react'
import {
  BlockTypes,
  ISbStoryData,
  MarkTypes,
  storyblokEditable,
  StoryblokRichTextNode,
  useStoryblokRichText,
} from '@storyblok/react'
import * as React from 'react'
import { CodeBlock } from '../CodeBlock'
import { Link } from '../Link'
import { TagList } from '../TagList/TagList'

const dateFormatter = Intl.DateTimeFormat('en-UK', {
  dateStyle: 'long',
})

const styles = {
  p: { mb: '0.5em' },
  '*:not(pre) > code, tt': {
    padding: '1px 3px',
    fontSize: '.85em',
    border: '1px solid #e3edf3',
    borderRadius: '2px',
  },
}

export interface BlogPostProps {
  story: ISbStoryData
  blok: any
}

function slugify(node: StoryblokRichTextNode<React.ReactElement>): string {
  const children = node.content ?? []
  return children
    .map((child) => {
      const text = child.text
      if (typeof text === 'string') {
        return text.toLowerCase().replace(/[^\w]/g, '')
      }
      return ''
    })
    .join('')
}

export const BlogPost = (props: BlogPostProps) => {
  const { story, blok } = props

  const { render } = useStoryblokRichText({
    resolvers: {
      [BlockTypes.HEADING]: (node) => {
        const { level, ...rest } = node.attrs ?? {}

        const sizeMap = {
          1: 'xl',
          2: 'lg',
          3: 'md',
          4: 'sm',
          5: 'xs',
          6: 'xs',
        } as const

        return (
          <Heading
            id={slugify(node)}
            as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
            size={sizeMap[level as keyof typeof sizeMap]}
            mt="1em"
            mb="0.5em"
            {...rest}
          >
            {node.children}
          </Heading>
        )
      },
      [BlockTypes.CODE_BLOCK]: (node) => {
        const { class: className, ...rest } = node.attrs ?? {}
        const code =
          node.content?.map((child) => child.text ?? '').join('') ?? ''

        return (
          <CodeBlock className={className} {...rest}>
            {code}
          </CodeBlock>
        )
      },
      [MarkTypes.LINK]: (node) => {
        const { href, target } = node.attrs ?? {}

        return (
          <Link href={href} target={target}>
            {node.text}
          </Link>
        )
      },
      [BlockTypes.COMPONENT]: (node) => {
        const blok = node.attrs?.body?.[0]
        if (!blok) return <></>
        if (blok.component === 'htmlsnippet') {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: blok.code as string }}
            />
          )
        }
        return <></>
      },
    },
  })

  return (
    <article>
      <Container as="header" mb={10}>
        <Heading as="h1">{story.name}</Heading>
        <section>
          <time dateTime={story.first_published_at!}>
            {dateFormatter.format(new Date(story.first_published_at!))}
          </time>
          {story.tag_list.length !== 0 && (
            <>
              {' '}
              on <TagList tags={story.tag_list} />
            </>
          )}
        </section>
      </Container>
      <Container as="section" {...storyblokEditable(blok)} sx={styles}>
        {render(blok.body)}
      </Container>
    </article>
  )
}
