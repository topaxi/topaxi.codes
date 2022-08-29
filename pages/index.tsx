import { Container, Heading } from "@chakra-ui/react";
import { getStoryblokApi } from "@storyblok/react";
import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TagList } from "../components/TagList/TagList";

export interface IndexPageProps {
  stories: any[];
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/`);

  console.log(data);

  return {
    notFound: data?.stories == null && data?.stories.length === 0,
    props: {
      stories: data?.stories,
    },
    revalidate: 3600, // revalidate every hour
  };
};

const dateFormatter = Intl.DateTimeFormat("en-UK", {
  dateStyle: "long",
});

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { stories } = props;

  return (
    <Layout brandComponent="h1">
      <Container>
        {stories.map((story) => (
          <article key={story.id}>
            <header>
              <Heading size="lg">
                <Link href={story.full_slug}>{story.name}</Link>
              </Heading>
            </header>
            <footer>
              {story.tag_list.length !== 0 && (
                <>
                  on <TagList tags={story.tag_list} />{" "}
                </>
              )}
              <time dateTime={story.published_at!}>
                {dateFormatter.format(new Date(story.published_at!))}
              </time>
            </footer>
          </article>
        ))}
      </Container>
    </Layout>
  );
};

export default IndexPage;
