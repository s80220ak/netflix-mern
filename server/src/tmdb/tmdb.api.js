import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, language, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, language, page })
    ),

  mediaDetail: async ({ mediaType, mediaId, language }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaDetail({ mediaType, mediaId, language })
    ),

  mediaGenres: async ({ mediaType, language }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType, language })),

  mediaCredits: async ({ mediaType, mediaId, language }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaCredits({ mediaType, mediaId, language })
    ),

  mediaVideos: async ({ mediaType, mediaId, language }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaVideos({ mediaType, mediaId, language })
    ),

  mediaImages: async ({ mediaType, mediaId, language }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaImages({ mediaType, mediaId, language })
    ),

  mediaRecommend: async ({ mediaType, mediaId, language }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaRecommend({ mediaType, mediaId, language })
    ),

  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),

  personDetail: async ({ personId, language }) =>
    axiosClient.get(tmdbEndpoints.personDetail({ personId, language })),

  personMedias: async ({ personId, language }) =>
    axiosClient.get(tmdbEndpoints.personMedia({ personId, language })),
};

export default tmdbApi;
