import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, language, page }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaCategory}`, { language, page }),

  mediaDetail: ({ mediaType, mediaId, language }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaId}`, { language }),

  mediaGenres: ({ mediaType, language }) =>
    tmdbConfig.getURL(`genre/${mediaType}/list`, { language }),

  mediaCredits: ({ mediaType, mediaId, language }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaId}/credits`, { language }),

  mediaVideos: ({ mediaType, mediaId, language }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaId}/videos`),

  mediaRecommend: ({ mediaType, mediaId, language }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaId}/recommendations`, { language }),

  mediaImages: ({ mediaType, mediaId, language }) =>
    tmdbConfig.getURL(`${mediaType}/${mediaId}/images`),

  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.getURL(`search/${mediaType}`, { query, page }),

  personDetail: ({ personId, language }) =>
    tmdbConfig.getURL(`person/${personId}`, { language }),

  personMedia: ({ personId, language }) =>
    tmdbConfig.getURL(`person/${personId}/combined_credits`, { language }),
};

export default tmdbEndpoints;
