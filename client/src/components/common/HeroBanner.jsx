import { Box, Typography, useTheme, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

import tmdbConfigs from "../../api/configs/tmdb.config";
import mediaApi from "../../api/modules/media.api";

const HeroBanner = ({ mediaType, mediaCategory }) => {
  const { language } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [backdropPath, setBackdropPath] = useState(null);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        language: language,
        page: 1,
      });

      if (response) {
        setMovies(response.results);
        setBackdropPath(
          response.results[Math.floor(Math.random() * 20)].backdrop_path
        );
      }
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    getMedias();
  }, [mediaType, mediaCategory, language, dispatch]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: 450,
        display: "flex",
        alignItems: "center",
        position: "absoulte",
        "@media (min-width: 768px)": {
          height: 700,
        },
        "::after": {
          content: "''",
          width: "100%",
          height: "250px",
          backgroundImage:
            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
          position: "absolute",
          bottom: "0",
          left: "0",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.5,
          overflow: "hidden",
          "& > img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          },
        }}
      >
        <img src={tmdbConfigs.backdropPath(backdropPath)} />
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          "& .MuiTextField-root": {
            marginTop: "15px",
          },
        }}
      >
        <Typography variant="h1" fontWeight="700">
          {t("Welcome")}
        </Typography>
        <Typography variant="h5" fontWeight="700">
          {t(
            "Millions of movies, TV shows and people to discover. Explore now."
          )}
        </Typography>

        <TextField
          color="success"
          placeholder="尋找電影、電視節目或人物..."
          sx={{
            width: "50%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "15px",
              },
            },
          }}
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
