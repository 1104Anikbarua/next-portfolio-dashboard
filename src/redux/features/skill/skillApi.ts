import { baseApi } from "@/redux/baseApi/baseApi";
import { IReduxResponse } from "@/types/global";
import { ISkill } from "@/types/skill.types";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get skills start here
    getSkills: build.query({
      query: () => {
        return {
          url: "/skills",
        };
      },
      transformResponse: (response: IReduxResponse<ISkill[]>) => {
        return {
          response: response?.data,
        };
      },
      providesTags: ["skills"],
    }),
    //get skills end here
    //get skill start here
    getSkill: build.query({
      query: ({ id }) => {
        // console.log(id);
        return {
          url: `/skills/${id}`,
        };
      },
      transformResponse: (response: IReduxResponse<ISkill>) => {
        // console.log(response);
        return {
          response: response?.data,
        };
      },
      providesTags: ["skills"],
    }),
    //get skill start here
    // add skill start here
    addSkill: build.mutation({
      query: (data) => {
        return {
          url: "/skills/create-skill",
          method: "POST",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<ISkill>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["skills"],
    }),
    // add skill ends here
    //update skill start here
    setSkill: build.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/skills/set-skill/${id}`,
          method: "PATCH",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<ISkill>) => {
        return {
          response,
        };
      },
      invalidatesTags: ["skills"],
    }),
    //update skill ends here
    // remove skill start here
    removeSkill: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/skills/remove-skill/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: IReduxResponse<ISkill>) => {
        console.log(response);
        return {
          response,
        };
      },
      invalidatesTags: ["skills"],
    }),
    // remove skill ends here
  }),
});

export const {
  useAddSkillMutation,
  useGetSkillsQuery,
  useRemoveSkillMutation,
  useSetSkillMutation,
  useGetSkillQuery,
} = skillApi;
