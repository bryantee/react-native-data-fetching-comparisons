import {createApi} from "@reduxjs/toolkit/query/react";
import {CHARACTERS_QUERY, GRAPHQL_ENDPOINT} from "../../App";
import request, {ClientError} from "graphql-request";

const graphqlBaseQuery =
  () =>
    async ({body}: { body: string }) => {
      try {
        const result = await request(GRAPHQL_ENDPOINT, body)
        return {data: result}
      } catch (error) {
        if (error instanceof ClientError) {
          return {error: {status: error.response.status, data: error}}
        }
        return {error: {status: 500, data: error}}
      }
    }

export const api = createApi({
  baseQuery: graphqlBaseQuery(),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => ({
        body: CHARACTERS_QUERY,
      }),
      transformResponse: (data) => data,
    }),
  }),
});

export const {useGetCharactersQuery, useLazyGetCharactersQuery} = api;
