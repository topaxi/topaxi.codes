import {
  chakra,
  Box,
  Container,
  HTMLChakraProps,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Link, LinkProps } from "../Link";

function LinkToHome(props: HTMLChakraProps<"a">) {
  return (
    <NextLink href="/" passHref>
      <chakra.a {...props}>topaxi.codes</chakra.a>
    </NextLink>
  );
}

function NavItem(props: LinkProps) {
  return (
    <chakra.li _notLast={{ _after: { content: "' | '", whiteSpace: "pre" } }}>
      <Link {...props} />
    </chakra.li>
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
      <Container as="header" mt={24} mb={10}>
        <chakra.nav position="relative" zIndex="1">
          <chakra.ul display="flex" listStyleType="none">
            <NavItem href="https://topaxi.ch/">Home</NavItem>
            <NavItem href="https://topaxi.codes/">Blog</NavItem>
            <NavItem href="https://cv.topaxi.ch/">CV</NavItem>
            <NavItem href="https://topaxi.ch/about">About</NavItem>
          </chakra.ul>
        </chakra.nav>
        <Box as={Brand} fontSize="5rem" lineHeight="1">
          <LinkToHome />
        </Box>
      </Container>
      <main>{children}</main>
      <Container as="footer" mt={24} display="flex">
        <div>
          <LinkToHome fontWeight="bold" />{" "}
          <chakra.span color="gray.500" fontSize="sm">
            &copy; {new Date().getUTCFullYear()}
          </chakra.span>
        </div>
        <Button
          variant="unstyled"
          ml="auto"
          title="Back to top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          ^
        </Button>
      </Container>
    </>
  );
}
