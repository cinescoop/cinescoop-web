import {
  Flex,
  Input,
  IconButton,
  SlideFade,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { SearchProps } from "./Navigation";

function Search({ version }: SearchProps) {
  const [visible, setVisible] = useState(false);
  const handleToggle = () => setVisible(!visible);

  if (version === "short") {
    return (
      <Flex w="40%" justifyContent="right">
        <SlideFade in={visible} offsetX={5} unmountOnExit={true} reverse={true}>
          <Input
            variant="flushed"
            placeholder="영화 제목, 감독 등을 입력해주세요"
            focusBorderColor="pink"
            w="30vw"
          />
        </SlideFade>
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={handleToggle}
          background="none"
          _focus={{ outline: "none" }}
          _hover={{ backgroundColor: "pink" }}
          borderRadius="10rem"
        />
      </Flex>
    );
  }
}

export default Search;
