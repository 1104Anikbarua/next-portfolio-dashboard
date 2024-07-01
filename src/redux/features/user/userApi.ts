import { baseApi } from "@/redux/baseApi/baseApi";
import { IReduxResponse } from "@/types/global";
import { IUser } from "@/types/user.types";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //
    getMe: build.query({
      query: () => {
        return {
          url: "/auth/me",
        };
      },
      transformResponse: (response: IReduxResponse<IUser>) => {
        return {
          response: response,
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useGetMeQuery } = userApi;
