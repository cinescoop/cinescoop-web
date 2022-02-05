import React from "react";
import { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Account({ isOpen, onClose }: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>비밀번호 변경하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" flexDir="column">
            <Text m="1rem">아이디</Text>
            <Input size="lg" placeholder="현재 비밀번호" mb="1rem" />
            <InputGroup>
              <Input
                size="lg"
                type={show ? "text" : "password"}
                placeholder="새 비밀번호"
              />
              <InputRightElement w="3rem" mt="0.25rem">
                {show ? (
                  <Icon boxSize="1.5rem" as={AiFillEye} onClick={handleClick} />
                ) : (
                  <Icon
                    boxSize="1.5rem"
                    as={AiFillEyeInvisible}
                    onClick={handleClick}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <Input size="lg" placeholder="새 비밀번호 확인" mb="3rem" />
            <Button mb="2rem" color="black" bgColor="pink">
              변경하기
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Account;
