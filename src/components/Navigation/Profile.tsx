import Link from "next/link";
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
import { useRouter } from "next/router";
import { loginState, uidState, userState } from "../../atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { AccountBoxProps } from "./Navigation";
import { auth } from "../../../firebase";

function Profile() {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(userState);
  const setUserId = useSetRecoilState(uidState);

  const initials = login ? user.displayName : "";

  const logout = () => {
    signOut(auth)
      .then(() => {
        setLogin(false);
        setUserId("");
        setUser({
          thirdParty: false,
          emailVerified: false,
          email: "",
          displayName: "",
          photoURL: "",
        });
        console.log("User logged out");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Flex>
      <Menu>
        <MenuButton
          as={Button}
          boxSize="fit-content"
          _hover={{
            background: "none",
            "&>span>span": {
              backgroundColor: "pink",
              transitionDuration: "0.4s",
            },
          }}
          _focus={{ outline: "none" }}
          _active={{ background: "none" }}
          background="none"
          alignSelf="center"
          padding={0}
        >
          {user.thirdParty ? (
            <Avatar
              src={user.photoURL}
              icon={<AiOutlineUser fontSize="1.5rem" />}
            ></Avatar>
          ) : (
            <Avatar
              name={initials}
              src={
                user.photoURL == ""
                  ? "https://bit.ly/broken-link"
                  : user.photoURL
              }
              icon={<AiOutlineUser fontSize="1.5rem" />}
            />
          )}
        </MenuButton>
        <MenuList position="relative" zIndex={2}>
          {login ? (
            <>
              <Link href={`/mypage`}>
                <MenuItem>마이페이지</MenuItem>
              </Link>
              <MenuItem onClick={logout}>로그아웃하기</MenuItem>
            </>
          ) : (
            <Link href={`/login`}>
              <MenuItem>로그인하기</MenuItem>
            </Link>
          )}
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Profile;
