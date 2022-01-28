import type { NextPage } from "next";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

import { BASE_URL } from "./api/useFetchGenre";
import { IMovie, ITrending, IGenre } from "../src/interfaces";
import theme from "../src/theme/theme";
import PageList from "../src/components/lists/PageList";
import SwipeList from "../src/components/lists/SwipeList";
import GenreList from "../src/components/lists/GenreList";
import Navigation from "../src/components/Navigation/Navigation";
import HomeText from "../src/components/HomeText";
import Cinema from "../src/components/Cinema";
import Footer from "../src/components/Footer";
import EmailForm from "../src/components/EmailForm";

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
      <Navigation />
      <PageList data={trending} />
      <HomeText />

      <Box mb={10} bgColor={theme.colors.brightBlue} p={5}>
        <Flex>
          <Heading size="lg" mb={5} mr={5}>
            상영 중인 영화
          </Heading>
          <Button variant="outline">예매하기</Button>
        </Flex>
        <Divider borderColor="gray.50" mb={5} />
        <SwipeList data={nowPlaying} />
      </Box>

      <Box mb={10}>
        <Heading size="lg" mb={5}>
          영화 순위
        </Heading>
        <SwipeList data={topRated} />
      </Box>

      <GenreList genres={genres} />
      <Cinema />

      <EmailForm />

      <Footer />
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
