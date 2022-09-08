import { Container, Heading } from '@chakra-ui/react'
import { storyblokEditable, StoryData } from '@storyblok/react'
import * as React from 'react'
import {
  MARK_LINK,
  NODE_CODEBLOCK,
  NODE_HEADING,
  render,
} from 'storyblok-rich-text-react-renderer'
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
  story: StoryData
  blok: any
}

export const BlogPost = (props: BlogPostProps) => {
  const { story, blok } = props

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
        {render(blok.body, {
          blokResolvers: {
            htmlsnippet(props) {
              const { code } = props

              return (
                <div dangerouslySetInnerHTML={{ __html: code as string }} />
              )
            },
          },
          markResolvers: {
            [MARK_LINK](children, props) {
              const { href, target } = props

              return (
                <Link href={href} target={target}>
                  {children}
                </Link>
              )
            },
          },
          nodeResolvers: {
            [NODE_HEADING](children, props) {
              const { level, ...rest } = props

              const sizeMap = {
                1: 'xl',
                2: 'lg',
                3: 'md',
                4: 'sm',
                5: 'xs',
                6: 'xs',
              } as const

              function slugify(children: React.ReactNode): string {
                return React.Children.toArray(children)
                  .map((v) => {
                    if (typeof v === 'string') {
                      return v.toLowerCase().replace(/[^\w\d]/g, '')
                    }

                    if (typeof v === 'number') {
                      return String(v)
                    }

                    return ''
                  })
                  .join('')
              }

              return (
                <Heading
                  id={slugify(children)}
                  as={`h${level}`}
                  size={sizeMap[level]}
                  mt="1em"
                  mb="0.5em"
                  {...rest}
                >
                  {children}
                </Heading>
              )
            },
            [NODE_CODEBLOCK](children: any, { class: className, ...props }) {
              return (
                <CodeBlock className={className} {...props}>
                  {children[0] as string}
                </CodeBlock>
              )
            },
          },
        })}
      </Container>
    </article>
  )
}
