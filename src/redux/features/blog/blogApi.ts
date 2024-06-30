import { baseApi } from "@/redux/baseApi/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get blog start here
    getBlogs: build.query({
      query: () => {
        return {
          url: "/blogs",
        };
      },
    }),
    // add blog start here
    addBlog: build.mutation({
      query: (data) => {
        return {
          url: "/blogs/create-blog",
          method: "POST",
          data,
        };
      },
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
  }),
});

export const { useAddBlogMutation } = blogApi;
