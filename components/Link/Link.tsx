import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps extends Omit<ChakraLinkProps, 'href'> {
  href?: NextLinkProps['href']
}

export const Link = (props: LinkProps) => {
  const { href, ...rest } = props

  if (href === undefined) {
    return <ChakraLink {...rest} />
  }

  return (
    <NextLink href={href} passHref>
      <ChakraLink {...rest} />
    </NextLink>
  )
}
