import {
  getStoryblokApi,
  StoryblokComponent,
  StoryData,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../components/Layout";

import "prismjs/themes/prism-tomorrow.min.css";

interface BlogPostProps {
  story: StoryData;
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async (ctx) => {
  const { preview, params } = ctx;
  const { slug } = params ?? {};

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: preview ? "draft" : "published",
  });

  return {
    notFound: data?.story == null,
    props: {
      story: data ? data.story : null,
      key: data ? data.story.id : null,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get("cdn/links/");

  let paths: Array<{ params: { slug: string }; locale?: string }> = [];

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }

    const slug = data.links[linkKey].slug;

    let splittedSlug = slug.split("/");

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths,
    fallback: true,
  };
};

function BlogPost(props: BlogPostProps) {
  const story = useStoryblokState(props.story);

  return (
    <Layout>
      <StoryblokComponent story={story} blok={story.content} />
    </Layout>
  );
}

export default BlogPost;
