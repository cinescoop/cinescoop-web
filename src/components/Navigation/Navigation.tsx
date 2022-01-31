import { Button, Flex, Spacer, useColorMode } from "@chakra-ui/react";

import AccountBox from "./Profile";
import Search from "./Search";
import PageLink from "./PageLink";

export interface SearchProps {
  version: string;
}
export interface AccountBoxProps {
  login: boolean;
  name: string;
}

function Navigation() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex gap={30} paddingX={100} paddingY={10} alignItems="center">
      <p>Logo</p>
      <PageLink path="/" name="Home" />
      <PageLink path="/about" name="About" />
      <Spacer />
      <Search version="short" />
      <Button
        onClick={toggleColorMode}
        variant="outline"
        size="md"
        _focus={{ outline: "none" }}
        _hover={{ borderColor: "pink" }}
      >
        {colorMode == "dark" ? "Dark" : "Light"} Mode
      </Button>
      <AccountBox login={true} name="Alice Jung" />
    </Flex>
  );
}

export default Navigation;
