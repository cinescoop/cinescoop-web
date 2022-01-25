import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import { AccountBoxProps } from "./TopBar";

function AccountBox({ login, name }: AccountBoxProps) {
  return (
    <Flex>
      <Avatar
        name="Segun Adebayo"
        src="https://bit.ly/broken-link"
        icon={<AiOutlineUser fontSize="1.5rem" />}
      />
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          _hover={{ color: "#FF5AF1" }}
          _focus={{ outline: "none" }}
          _active={{ background: "none" }}
          background="none"
          alignSelf="center"
        >
          {name}
        </MenuButton>
        <MenuList>
          <MenuItem>마이페이지</MenuItem>
          <MenuItem>로그아웃하기</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default AccountBox;
