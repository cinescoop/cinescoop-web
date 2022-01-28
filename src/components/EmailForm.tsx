import {
  Center,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import theme from "../theme/theme";

interface IForm {
  email: string;
}

function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    setSuccess("구독해주셔서 감사합니다 🤩");
  };
  const [success, setSuccess] = useState("");

  console.log(errors);

  return (
    <Center my={40}>
      <Flex direction="column" w="60%" maxW="40rem">
        <Heading size="lg" alignSelf="center" mb={5}>
          이메일로 영화 정보를 받아보세요
        </Heading>
        <Text align="center" mb={10}>
          매주 ○요일 개봉한 영화 관련 정보를 보내드립니다
        </Text>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel
              htmlFor="email"
              textAlign="center"
              fontSize="2xl"
              fontWeight="bold"
            >
              이메일
            </FormLabel>
            <Input
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value:
                    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/,
                  message: "이메일 형식이 아닙니다",
                },
              })}
              id="email"
              type="email"
              placeholder="여기에 이메일을 입력하세요"
              h="4rem"
              variant="outline"
              focusBorderColor={theme.colors.pink}
            />
          </FormControl>
          <Text fontSize="sm" color="tomato">
            {errors?.email?.message}
          </Text>
          <Center>
            <Button
              colorScheme="pink"
              mt={5}
              bg={theme.colors.pink}
              color={theme.colors.darkBlue}
              type="submit"
              w="100%"
              h="4rem"
              fontSize="2xl"
            >
              제출
            </Button>
          </Center>
        </form>
        <Text align="center" fontSize="sm" mt={5}>
          {success}
        </Text>
      </Flex>
    </Center>
  );
}

export default EmailForm;
