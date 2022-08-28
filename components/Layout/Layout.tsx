import { chakra, Box, Container, HTMLChakraProps } from "@chakra-ui/react";
import Link from "next/link";

function LinkToHome(props: HTMLChakraProps<"a">) {
  return (
    <Link href="/" passHref>
      <chakra.a {...props}>topaxi.codes</chakra.a>
    </Link>
  );
}

export interface LayoutProps {
  brandComponent?: React.ComponentType | keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children, brandComponent: Brand = "div" } = props;

  return (
    <>
      <Container as="header">
        <Box as={Brand} mt={24} mb={10} fontSize="5rem">
          <LinkToHome />
        </Box>
      </Container>
      <main>{children}</main>
      <Container as="footer" mt={24}>
        <LinkToHome fontWeight="bold" />{" "}
        <chakra.span color="gray.500" fontSize="sm">
          &copy; {new Date().getUTCFullYear()}
        </chakra.span>
      </Container>
    </>
  );
}
