import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "38%", md: "15%" },
        },
        "& .swiper": {
          width: { xs: "120%" },
          height: "max-content",
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        // style={{ width: "120%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
