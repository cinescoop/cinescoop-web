import { useEffect, useState } from "react";
import axios from "axios";


function useFetchMovieDetails(movieID: number) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=d54af9ddd98c8365041d4818551a5a04&language=en-US`
        );
        setMovieDetails(res.data);
        setIsLoading(false);

        //console
        console.log(movieDetails);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getMovieDetails();
  }, []);

  return { movieDetails, setMovieDetails, isLoading, isError };
}

export default useFetchMovieDetails;
