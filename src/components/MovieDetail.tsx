import { Stack, Flex, Image, Text, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import { IMAGE_URL } from "../../pages/api/useFetchGenre";
import { movieIDState } from "../atom";
import { ICast, IMovieDetails } from "../interfaces";

interface IDetailProps {
  detailData?: IMovieDetails;
  creditData?: ICast[];
}

const MovieDetail = ({ detailData, creditData }: IDetailProps) => {
  const router = useRouter();
  const movieID = useRecoilValue(movieIDState);

  const onClick = () => {
    router.push(`/movieinfo/${movieID}`);
  };

  return (
    <Flex>
      <Image src={`${IMAGE_URL}/w300/${detailData?.poster_path}`} />
      <Flex direction="column" justifyContent="space-between" ml="2rem">
        <Stack>
          <Heading>{detailData?.title}</Heading>
          <Text>
            <Text as="b">평점 </Text>
            {detailData?.popularity} | <Text as="b">예매율 </Text>
            {detailData?.vote_average}%
          </Text>
          <Text>
            <Text as="b">개요 </Text> {detailData?.genres[0].name}{" "}
            {detailData?.genres[1]?.name} | {detailData?.runtime}분 |{" "}
            {detailData?.release_date} 개봉
          </Text>
          <Text>
            <Text as="b">출연 </Text> {creditData && creditData[0].name}
          </Text>
          <Text>{detailData?.overview}</Text>
        </Stack>
        <Button onClick={onClick} w="8rem" bg="brightBlue">
          관련 정보
        </Button>
      </Flex>
    </Flex>
  );
};

export default MovieDetail;
