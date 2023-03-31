import publicClient from "../client/public.client.js";

const genreEndpoints = {
  list: ({ mediaType, language }) => `${mediaType}/genres?language=${language}`,
};

const genreApi = {
  getList: async ({ mediaType, language }) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType, language })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
