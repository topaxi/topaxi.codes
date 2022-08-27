import { chakra, Box, Container } from "@chakra-ui/react";
import Link from "next/link";

export interface LayoutProps {
  brandComponent?: React.ComponentType | keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children, brandComponent: Brand = "div" } = props;

  return (
    <>
      <Container as="header">
        <Box as={Brand}>
          <Link href="/" passHref>
            <a>topaxi.codes</a>
          </Link>
        </Box>
      </Container>
      <main>{children}</main>
      <Container as="footer">
        topaxi.codes &copy; {new Date().getUTCFullYear()}
      </Container>
    </>
  );
}
