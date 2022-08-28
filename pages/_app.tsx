import { ChakraProvider, extendTheme, withDefaultSize } from "@chakra-ui/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import type { AppProps } from "next/app";
import { BlogPost } from "../components/BlogPost";
import { Feature } from "../components/Feature";
import { Grid } from "../components/Grid";
import { Page } from "../components/Page";
import { Teaser } from "../components/Teaser";

storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: {
    pre: (props) => <pre {...props} data-test="wat" />,
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page,
    blogpost: BlogPost,
  },
});

const theme = extendTheme({
  fonts: {
    heading: '"PT Sans", sans-serif',
    body: '"PT Sans", sans-serif',
    mono: '"Fira Code", monospace',
  },
  components: {
    Container: {
      baseStyle: {
        maxW: ["container.sm", null, "container.md", null, "container.lg"],
      },
    },
  },
});

console.log(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
