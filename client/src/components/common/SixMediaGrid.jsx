import { Grid } from "@mui/material";
import SixMediaItem from "./SixMediaItem";

const SixMediaGrid = ({ medias, mediaType }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {medias.map((media, index) => (
        <Grid item xs={6} sm={2} key={index}>
          <SixMediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SixMediaGrid;
