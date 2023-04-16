import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import SixMediaGrid from "./SixMediaGrid";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";

import uiConfigs from "../../configs/ui.configs";

import CircularRate from "./CircularRate";

import tmdbConfigs from "../../api/configs/tmdb.config";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";

const TvSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        language: language,
        page: 1,
      });

      const newMovies = [...response.results]
        .sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
        .slice(0, 18);

      if (response) {
        setMovies(response.results);
        setFilteredMovies(newMovies);
      }
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({
        mediaType,
        language: language,
      });

      if (response) {
        setGenres(response.genres);

        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, language, dispatch]);

  return (
    <Box
      sx={{
        width: "100vw",
        padding: "20px",
        position: "relative",
        color: "primary.contrastText",
        backgroundColor: "#04152d",
        "&::before": {
          content: '""',
          width: "100%",
          height: "20%",
          borderRadius: "10px",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
        },
      }}
    >
      <Stack spacing={2} direction="row">
        <SixMediaGrid medias={filteredMovies} mediaType={mediaType} />
        <Swiper
          grabCursor={true}
          loop={true}
          modules={[Autoplay]}
          style={{ width: "1200px", height: "600px" }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  borderRadius: "10px",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_Path || movie.poster_path
                  )})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage[
                    theme.palette.mode
                  ],
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "60%" },
                  }}
                >
                  <Stack
                    spacing={4}
                    direction="column"
                    sx={{ position: "absolute", left: "50px", bottom: "50px" }}
                  >
                    {/** title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                    >
                      {movie.title || movie.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/** rating */}
                      <CircularRate value={movie.vote_average} />

                      <Divider orientation="vertical" />
                      {/** genres */}
                      {[...movie.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            key={index}
                            label={
                              genres.find((e) => e.id === genreId) &&
                              genres.find((e) => e.id === genreId).name
                            }
                          />
                        ))}
                    </Stack>

                    {/** overview */}
                    <Typography
                      variant="body1"
                      sx={{ ...uiConfigs.style.typoLines(3) }}
                    >
                      {movie.overview}
                    </Typography>

                    {/** */}
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      watch now
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Box>
  );
};

export default TvSlide;
