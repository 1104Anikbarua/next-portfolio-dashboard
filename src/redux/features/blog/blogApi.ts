import { baseApi } from "@/redux/baseApi/baseApi";
import { IBlog } from "@/types/blog.types";
import { IReduxResponse } from "@/types/global";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get blogs start here
    getBlogs: build.query({
      query: () => {
        return {
          url: "/blogs",
        };
      },
      transformResponse: (response: IReduxResponse<IBlog[]>) => {
        console.log(response);
        return {
          response: response.data,
        };
      },
      providesTags: ["blogs"],
    }),
    //get blogs end here
    //get blog start here
    getBlog: build.query({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
        };
      },
    }),
    //get blog start here
    // add blog start here
    addBlog: build.mutation({
      query: (data) => {
        return {
          url: "/blogs/create-blog",
          method: "POST",
          data,
        };
      },
      transformResponse: (response: IReduxResponse<IBlog>) => {
        console.log(response);
        return {
          response,
        };
      },
      invalidatesTags: ["blogs"],
    }),
    // add blog ends here
    //update blog start here
    setBlog: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/blogs/set-blog/${data}`,
          method: "PATCH",
          data,
        };
      },
    }),
    //update blog ends here
    // remove blog start here
    removeBlog: build.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/blogs/remove-blog/${id}`,
          method: "DELETE",
        };
      },
    }),
    // remove blog ends here
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogsQuery,
  useRemoveBlogMutation,
  useSetBlogMutation,
} = blogApi;
