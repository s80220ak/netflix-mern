import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import MovieSlide from "../components/common/MovieSlide";
import TvSlide from "../components/common/TvSlide";
import MediaSlide from "../components/common/MediaSlide";
import HeroBanner from "../components/common/HeroBanner";

import tmdbConfigs from "../api/configs/tmdb.config";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          maxWidth: "1366px",
          display: { xs: "none", md: "block" },
        }}
      >
        <HeroBanner
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />

        <MovieSlide
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />

        <TvSlide
          mediaType={tmdbConfigs.mediaType.tv}
          mediaCategory={tmdbConfigs.mediaCategory.top_rated}
        />
      </Box>

      <Box sx={{ display: { md: "none" } }}>
        <HeroSlide
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
        <Box
          sx={{
            ...uiConfigs.style.mainContent,
          }}
        >
          <Container header={t("popular movies")}>
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.movie}
              mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
          </Container>

          <Container header={t("popular series")}>
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.tv}
              mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
          </Container>

          <Container header={t("top rated movies")}>
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.movie}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          </Container>

          <Container header={t("top rated series")}>
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.tv}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
