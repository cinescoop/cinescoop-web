import { Flex, Spacer, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import AccountBox from "./AccountBox";
import Search from "./Search";

export interface SearchProps {
  version: string;
}
export interface AccountBoxProps {
  login: boolean;
  name: string;
}
interface PageLinkProps {
  path: string;
  name: string;
}

function PageLink({ path, name }: PageLinkProps) {
  return (
    <NextLink href={path} passHref>
      <Link
        _hover={{ color: "pink" }}
        textDecoration="none"
        transitionDuration="0.2s"
        _focus={{ outline: 0 }}
      >
        {name}
      </Link>
    </NextLink>
  );
}

function Navigation() {
  return (
    <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
      <p>Logo</p>
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      <Search version="short" />
      <AccountBox login={true} name="Alice Jung" />
    </Flex>
  );
}

export default Navigation;
