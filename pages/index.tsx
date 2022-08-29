import { Container } from "@chakra-ui/react";
import { getStoryblokApi, StoryData } from "@storyblok/react";
import type { GetStaticProps, NextPage } from "next";
import { BlogPostListItem } from "../components/BlogPostListItem";
import { Layout } from "../components/Layout";

export interface IndexPageProps {
  stories: StoryData[];
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/`, {
    sort_by: "first_published_at:desc",
  });

  return {
    notFound: data?.stories == null && data?.stories.length === 0,
    props: {
      stories: data?.stories,
    },
    revalidate: 3600, // revalidate every hour
  };
};

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { stories } = props;

  return (
    <Layout brandComponent="h1">
      <Container>
        {stories.map((story) => (
          <BlogPostListItem key={story.id} story={story} _notLast={{ mb: 6 }} />
        ))}
      </Container>
    </Layout>
  );
};

export default IndexPage;
