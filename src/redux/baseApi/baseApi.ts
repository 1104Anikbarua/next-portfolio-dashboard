import { axiosBaseQuery } from "@/helpers/axios/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "user",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["user"],
});
