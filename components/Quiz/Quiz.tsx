import { StoryblokComponentType, useStoryblokRichText } from '@storyblok/react'

export interface QuizProps {
  title: string
  answers: Array<StoryblokComponentType<'quizanswer'>>
  content: StoryblokComponentType<string>
  description: any
}

export function Quiz(props: QuizProps) {
  const { title, answers, content, description, ...rest } = props

  const { render } = useStoryblokRichText({})

  return (
    <section {...rest} className="quiz">
      <strong>{title}</strong>
      <div className="quiz-description">{render(description)}</div>
    </section>
  )
}
