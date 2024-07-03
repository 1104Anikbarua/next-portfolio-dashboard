import { baseApi } from "@/redux/baseApi/baseApi";
import { IEducation } from "@/types/education.types";
import { IReduxResponse } from "@/types/global";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get educations start here
    getEducations: build.query({
      query: () => {
        return {
          url: "/educations",
        };
      },
      transformResponse: (response: IReduxResponse<IEducation[]>) => {
        return {
          response: response?.data,
        };
      },
      providesTags: ["educations"],
    }),
    //get educations end here
    //get education start here
    getEducation: build.query({
      query: ({ id }) => {
        // console.log(id);
        return {
          url: `/educations/${id}`,
        };
      },
      transformResponse: (response: IReduxResponse<IEducation>) => {
        // console.log(response);
        return {
          response: response?.data,
        };
      },
      providesTags: ["educations"],
    }),
    //get education start here
    // add education start here
    addEducation: build.mutation({
      query: (data) => {
        return {
          url: "/educations/create-education",
          method: "POST",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<IEducation>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["educations"],
    }),
    // add education ends here
    //update education start here
    setEducation: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/educations/set-education/${id}`,
          method: "PATCH",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<IEducation>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["educations"],
    }),
    //update education ends here
    // remove education start here
    removeEducation: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/educations/remove-education/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: IReduxResponse<IEducation>) => {
        console.log(response);
        return {
          response,
        };
      },
      invalidatesTags: ["educations"],
    }),
    // remove education ends here
  }),
});

export const {
  useAddEducationMutation,
  useGetEducationsQuery,
  useRemoveEducationMutation,
  useSetEducationMutation,
  useGetEducationQuery,
} = educationApi;
