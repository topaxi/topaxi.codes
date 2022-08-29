import { Container } from "@chakra-ui/react";
import { getStoryblokApi, StoryData } from "@storyblok/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { BlogPostListItem } from "../../components/BlogPostListItem";
import { Layout } from "../../components/Layout";

export interface TagPageProps {
  stories: StoryData[];
}

export const getStaticProps: GetStaticProps<TagPageProps> = async (ctx) => {
  const { tag } = ctx.params!;
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/`, {
    sort_by: "first_published_at:desc",
    with_tag: tag,
  });

  return {
    notFound: data?.stories == null || data?.stories.length === 0,
    props: {
      stories: data?.stories,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get("cdn/tags/");

  let paths: string[] =
    data.tags
      ?.filter(({ taggings_count }: any) => taggings_count > 0)
      .map(({ name }: { name: string }) => `/tag/${name}`) ?? [];

  return {
    paths,
    fallback: true,
  };
};

const TagPage: NextPage<TagPageProps> = (props) => {
  const { stories } = props;

  return (
    <Layout>
      <Container>
        {stories?.map((story) => (
          <BlogPostListItem key={story.id} story={story} _notLast={{ mb: 6 }} />
        ))}
      </Container>
    </Layout>
  );
};

export default TagPage;
