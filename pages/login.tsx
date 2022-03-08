import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { NextPage } from "next";
import styled from "styled-components";
import NextLink from "next/link";
import {
  FormControl,
  Text,
  InputRightElement,
  InputGroup,
  Heading,
  Flex,
  Button,
  Input,
  Icon,
  Link,
  Divider,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import {
  auth,
  db,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../firebase";
import Navigation from "../src/components/Navigation/Navigation";
import facebookLogo from "../public/facebookLogo.png";
import twitterLogo from "../public/twitterLogo.svg";
import { IForm } from "../src/interfaces";
import ErrorMessage from "../src/components/Account/ErrorMessage";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const errorToast = useToast();
  const bgColor = useColorModeValue("darkBlue", "white");
  const txtColor = useColorModeValue("white", "darkBlue");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();


  const saveThirdPartyUserToDb = async (
    id: string,
    username: string | null
  ) => {
    const dbUser = await getDoc(doc(db, "users", id));
    if (dbUser.exists()) {
      console.log("user already exists");
    } else {
      try {
        await setDoc(doc(db, "users", id), {
          id: id,
          username: username,
          movies: [],
        });
        console.log("complete to save");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const logError = (error: any, provider: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = provider.credentialFromError(error);
    console.log(errorCode, errorMessage, email, credential);
  };

  const loginSubmit: SubmitHandler<IForm> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("login success");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        errorToast({
          title: "로그인 실패",
          description:
            "계정이 존재하지 않거나 비밀번호가 일치하지 않습니다. 다시 시도해보십시오.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const googleUser = result.user;

        console.log("login success with Google");
        saveThirdPartyUserToDb(googleUser.uid, googleUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, GoogleAuthProvider);
      });
  };

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const facebookUser = result.user;

        console.log("login success with Facebook");
        saveThirdPartyUserToDb(facebookUser.uid, facebookUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, FacebookAuthProvider);
      });
  };

  const loginWithTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const twitterUser = result.user;

        console.log("login success with Twitter");
        saveThirdPartyUserToDb(twitterUser.uid, twitterUser.displayName);
        router.push("/");
      })
      .catch((error) => {
        logError(error, TwitterAuthProvider);
      });
  };

  const clickShow = () => setShow(!show);
  return (
    <>
      <Navigation search={true} />
      <Flex w="100%" h="80vh" justify="center">
        <Flex
          px="5rem"
          width="50rem"
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Heading size="2xl" mb="1.5rem">
            로그인
          </Heading>

          <StyledForm method="post" onSubmit={handleSubmit(loginSubmit)}>
            <FormControl>
              <Text mt="1.2rem">이메일</Text>
              <Input {...register("email")} />
              <ErrorMessage message={errors?.email?.message} />
              <Text mt="1.2rem">비밀번호</Text>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  type={show ? "text" : "password"}
                />
                <InputRightElement width="3rem">
                  {show ? (
                    <Icon boxSize="1.5rem" as={AiFillEye} onClick={clickShow} />
                  ) : (
                    <Icon
                      boxSize="1.5rem"
                      as={AiFillEyeInvisible}
                      onClick={clickShow}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <ErrorMessage message={errors?.password?.message} />
            </FormControl>

            <Button
              type="submit"
              mt="3rem"
              bg="pink"
              color="darkBlue"
              py="1rem"
              w="100%"
            >
              로그인
            </Button>
          </StyledForm>
          <Flex mt="1rem">
            <Text mr="0.5rem">아직 계정이 없나요?</Text>
            <NextLink href="/join" passHref>
              <Link textDecoration="underline">회원가입</Link>
            </NextLink>
          </Flex>
        </Flex>
        <Divider orientation="vertical" opacity="0.2" borderColor="white" />
        <Flex px="5rem" direction="column" justify="center">
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithGoogle}
          >
            <Image
              w="2.5rem"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
            />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Google
            </Text>
          </Button>
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithFacebook}
          >
            <Image w="2.5rem" src={facebookLogo.src} />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Facebook
            </Text>
          </Button>
          <Button
            bgColor={bgColor}
            p="0.5rem 1rem"
            h="fit-content"
            my="0.5rem"
            onClick={loginWithTwitter}
          >
            <Image w="2.5rem" src={twitterLogo.src} />
            <Text color={txtColor} ml="1rem" fontSize="1rem">
              Continue with Twitter
            </Text>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;

const StyledForm = styled.form`
  max-width: 32rem;
  width: 100%;
`;
