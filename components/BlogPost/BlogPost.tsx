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

// The library types context.render as (tag: string, ...) but at runtime
// it delegates to React.createElement which accepts component references.
type RenderFn = (
  tag: string | React.ComponentType<any>,
  attrs?: Record<string, any>,
  children?: React.ReactNode,
) => React.ReactElement

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
      [BlockTypes.HEADING]: (node, context) => {
        const h = context.render as RenderFn
        const { level } = node.attrs ?? {}

        const sizeMap = {
          1: 'xl',
          2: 'lg',
          3: 'md',
          4: 'sm',
          5: 'xs',
          6: 'xs',
        } as const

        return h(
          Heading,
          {
            id: slugify(node),
            as: `h${level}`,
            size: sizeMap[level as keyof typeof sizeMap],
            mt: '1em',
            mb: '0.5em',
          },
          node.children,
        )
      },
      [BlockTypes.CODE_BLOCK]: (node, context) => {
        const h = context.render as RenderFn
        const { class: className } = node.attrs ?? {}
        const code =
          node.content?.map((child) => child.text ?? '').join('') ?? ''

        return h(CodeBlock, { className }, code)
      },
      [MarkTypes.LINK]: (node, context) => {
        const h = context.render as RenderFn

        const { href, target } = node.attrs ?? {}

        return h(Link, { href, target }, node.text as React.ReactNode)
      },
      [BlockTypes.COMPONENT]: (node, context) => {
        const blok = node.attrs?.body?.[0]
        if (!blok) return context.render('span', {})
        if (blok.component === 'htmlsnippet') {
          return context.render('div', {
            dangerouslySetInnerHTML: { __html: blok.code as string },
          })
        }
        return context.render('span', {})
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
