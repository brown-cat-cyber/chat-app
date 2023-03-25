import React from "react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { build } from "vite"
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  endpoints: (build) => ({
    postAiText: build.mutation({
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload,
      }),
    }),
  }),
})

export const { usePostAiTextMutation } = api
