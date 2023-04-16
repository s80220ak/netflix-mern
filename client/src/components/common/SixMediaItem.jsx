import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../api/configs/tmdb.config";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector } from "react-redux";
import favoriteUtils from "../../utils/favorite.utils";

const SixMediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [posterPath, setPosterPath] = useState("");

  useEffect(() => {
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          marginX: "0.5rem",
          paddingTop: "140%",
          borderRadius: "15px",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        {/** movie or tv item */}
        {mediaType !== "people" && (
          <>
            {favoriteUtils.check({ listFavorites, mediaId: media.id }) && (
              <FavoriteIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            )}
            <Box
              className="media-back-drop"
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
              }}
            />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" },
              }}
            />
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" },
              }}
            ></Box>
          </>
        )}
        {/** movie or tv item */}

        {/** people */}
        {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0,6)",
            }}
          >
            <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
              {media.name}
            </Typography>
          </Box>
        )}
        {/** people */}
      </Box>
    </Link>
  );
};

export default SixMediaItem;
