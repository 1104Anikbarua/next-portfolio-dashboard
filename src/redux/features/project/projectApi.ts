import { baseApi } from "@/redux/baseApi/baseApi";
import { IReduxResponse } from "@/types/global";
import { IProject } from "@/types/project.types";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all projects start here
    getProjects: build.query({
      query: () => {
        return {
          url: "/projects",
        };
      },
      transformResponse: (response: IReduxResponse<IProject[]>) => {
        return { response: response.data };
      },
      providesTags: ["projects"],
    }),
    // get all projects ends here
    // get all project start here
    getProject: build.query({
      query: (id) => {
        return {
          url: `/projects/${id}`,
        };
      },
      transformResponse: (response: IReduxResponse<IProject>) => {
        return { response: response.data };
      },
      providesTags: ["projects"],
    }),
    // get all project ends here
    // add project start here
    addProject: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/projects/create-project",
          method: "POST",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<IProject>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["projects"],
    }),
    // add project ends here
    // update project start here
    setProject: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/projects/set-project/${id}`,
          method: "PATCH",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<IProject>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["projects"],
    }),
    // update project ends here
    // remove project start here
    removeProject: build.mutation({
      query: (id) => {
        return {
          url: `/projects/remove-project/${id}`,
          method: "Delete",
        };
      },
      transformResponse: (response: IReduxResponse<IProject>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["projects"],
    }),
    // remove project ends here
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useSetProjectMutation,
  useRemoveProjectMutation,
} = projectApi;
