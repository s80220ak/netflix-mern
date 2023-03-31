import privateClient from "../client/private.client.js";
import publicClient from "../client/public.client.js";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, language, page }) =>
    `${mediaType}/${mediaCategory}?language=${language}&?page=${page}`,
  detail: ({ mediaType, mediaId, language }) =>
    `${mediaType}/detail/${mediaId}?language=${language}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, language, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, language, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId, language }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId, language })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
