import { Center, Flex, Heading, Divider, Img, Text } from "@chakra-ui/react";

import theme from "../theme/theme";

function Cinema() {
  return (
    <Center mt={10}>
      <Flex direction="column" bg={theme.colors.white} color="black" p={10}>
        <Heading size="lg" textAlign="center">
          영화상영관
        </Heading>
        <Divider borderColor="gray.600" mt={10} />
        <Flex>
          <Img src="cgv.png" alt="CGV" boxSize="10rem" objectFit="contain" />
          <Img
            src="megabox.png"
            alt="Megabox"
            boxSize="10rem"
            objectFit="contain"
          />
          <Img
            src="lotte.png"
            alt="Lotte Cinema"
            boxSize="10rem"
            objectFit="contain"
          />
        </Flex>
        <Divider borderColor="gray.600" mb={10} />
        <Text align="center" as="b">
          CGV, 메가박스, 롯데시네마 상영 정보를 알려줍니다
        </Text>
      </Flex>
    </Center>
  );
}

export default Cinema;
