import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.config";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const MediaList = () => {
  const { t } = useTranslation();
  const { mediaType } = useParams();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        language: language,
        page: currentPage,
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currentPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    getMedias();
  }, [mediaType, currentCategory, currentPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return;
    setMedias([]);
    setCurrentPage(1);
    setCurrentCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie
              ? t("Movies")
              : t("TV Series")}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currentCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currentCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {t(cate)}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
