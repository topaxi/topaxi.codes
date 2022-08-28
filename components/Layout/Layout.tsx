import {
  chakra,
  Box,
  Container,
  HTMLChakraProps,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

function LinkToHome(props: HTMLChakraProps<"a">) {
  return (
    <NextLink href="/" passHref>
      <chakra.a {...props}>topaxi.codes</chakra.a>
    </NextLink>
  );
}

function NavItem(props: JSX.IntrinsicElements["a"]) {
  const { href, ...rest } = props;

  return (
    <chakra.li _notLast={{ _after: { content: "' | '", whiteSpace: "pre" } }}>
      <NextLink href={href!} passHref>
        <Link {...rest} />
      </NextLink>
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
        <Box as={Brand} fontSize="5rem">
          <LinkToHome />
        </Box>
        <nav>
          <chakra.ul display="flex" listStyleType="none">
            <NavItem href="https://topaxi.ch/">Home</NavItem>
            <NavItem href="https://topaxi.codes/">Blog</NavItem>
            <NavItem href="https://cv.topaxi.ch/">CV</NavItem>
            <NavItem href="https://topaxi.ch/about">About</NavItem>
          </chakra.ul>
        </nav>
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
