import type { NextPage } from "next";

import PageList from "../src/components/PageList";
import SwipeList from "../src/components/SwipeList";
import GenreList from "../src/components/GenreList";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import { BASE_URL } from "./api/useFetchGenre";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

interface IHomeProps {
  trending: ITrending[];
  nowPlaying: IMovie[];
  topRated: IMovie[];
  genres: IGenre[];
}

const Home: NextPage<IHomeProps> = ({
  trending,
  nowPlaying,
  topRated,
  genres,
}) => {
  return (
    <>
      <PageList data={trending} />

      <Box mb={10}>
        <Flex>
          <Heading size="lg" mb={5} mr={5}>
            상영 중인 영화
          </Heading>
          <Button variant="outline">예매하기</Button>
        </Flex>
        <SwipeList data={nowPlaying} />
      </Box>

      <Box mb={10}>
        <Heading size="lg" mb={5}>
          영화 순위
        </Heading>
        <SwipeList data={topRated} />
      </Box>

      <GenreList genres={genres} />
    </>
  );
};

export async function getStaticProps() {
  // Trending movies
  const { results: trending } = await (
    await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${process.env.API_KEY}&language=ko&include_adult=true`
    )
  ).json();

  // Now playing movies
  const { results: nowPlaying } = await (
    await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=ko&include_adult=true&page=1`
    )
  ).json();

  // Top rated movies
  const { results: topRated } = await (
    await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=ko&include_adult=true&page=1`
    )
  ).json();

  // Genre ids
  const { genres } = await (
    await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=ko`
    )
  ).json();

  return { props: { trending, nowPlaying, topRated, genres } };
}

export default Home;
