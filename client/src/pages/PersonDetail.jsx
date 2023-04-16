import { Box, Toolbar, Typography, Stack } from "@mui/material";
import tmdbConfigs from "../api/configs/tmdb.config";
import uiConfigs from "../configs/ui.configs";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PersonMediaGrid from "../components/common/PersonMediaGrid";
import Container from "../components/common/Container";

import personApi from "../api/modules/person.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const PersonDetail = () => {
  const { personId } = useParams();
  const { language } = useSelector((state) => state.language);
  const { t } = useTranslation();

  const [person, setPerson] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.detail({
        personId,
        language: language,
      });
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId, language, dispatch]);

  return (
    <>
      <Toolbar />
      {person && (
        <Box sx={{ ...uiConfigs.style.mainContent }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center" },
            }}
          >
            <Box sx={{ width: { xs: "60%", md: "30%" } }}>
              <Box
                sx={{
                  height: "60vh",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "darkgrey",
                  backgroundImage: `url(${tmdbConfigs.posterPath(
                    person.profile_path
                  )})`,
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "70%" },
                padding: { xs: "1rem 0", md: "1rem 2rem" },
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h5" fontWeight="700">
                  {`${person.name} (${
                    person.birthday && person.birthday.split("-")[0]
                  }`}
                  {person.deathday &&
                    ` - ${person.deathday && person.deathday.split("-")[0]}`}
                  {")"}
                </Typography>
                <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                  {person.biography}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Container header={t("medias")}>
            <PersonMediaGrid personId={personId} />
          </Container>
        </Box>
      )}
    </>
  );
};

export default PersonDetail;
