import publicClient from "../client/public.client.js";

const personEndpoints = {
  detail: ({ personId, language }) => `person/${personId}?language=${language}`,
  medias: ({ personId, language }) =>
    `person/${personId}/medias?language=${language}`,
};

const personApi = {
  detail: async ({ personId, language }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId, language })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId, language }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId, language })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
