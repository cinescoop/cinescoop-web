import { VStack, Heading, Box, Center } from "@chakra-ui/react";

import theme from "../theme/theme";

function HomeText() {
  return (
    <VStack m={20}>
      <Heading color={theme.colors.pink}>분산된 영화 정보를 한 번에</Heading>
      <Box>
        <Center fontSize="xl" m={2}>
          인기 있는 영화,
        </Center>
        <Center fontSize="xl" m={2}>
          현재 상영 중인 영화,
        </Center>
        <Center fontSize="xl" m={2}>
          보고 싶은 영화를
        </Center>
        <Center fontSize="xl" m={2}>
          찜하거나 바로 예매하세요
        </Center>
      </Box>
    </VStack>
  );
}

export default HomeText;
