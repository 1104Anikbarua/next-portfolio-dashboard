"use client";
import React from "react";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import Image from "next/image";
import Link from "next/link";
import ManageBlogSkeleton from "@/components/Ui/Skeleton/ManageBlogSkeleton";

const Blogs = () => {
  // get all blogs api
  const { data, isLoading, error } = useGetBlogsQuery({});
  const blogs = data?.response;

  // get all blogs api
  //get me api
  const {
    data: response,
    isFetching: isUserFetching,
    error: userError,
  } = useGetMeQuery({});
  const user = response?.response;

  //get me api

  if (isLoading || isUserFetching) {
    return <ManageBlogSkeleton />;
  }

  if (error || userError) {
    return <Typography color="error">Failed to load data</Typography>;
  }
  return (
    <Container>
      {/* component title start */}
      <Typography
        component={"h3"}
        variant="h3"
        sx={{
          fontSize: { xs: "24px" },
          fontWeight: { xs: 600, sm: 800 },
          opacity: "0.7",
          my: 5,
          textAlign: "center",
        }}
      >
        All Blogs
      </Typography>
      {/* component title end */}
      {/* blog card start  */}
      <Stack rowGap={2}>
        {blogs?.map((blog, index) => (
          <Link
            href={`blog/${blog.id}`}
            style={{ textDecoration: "none" }}
            key={blog.id}
          >
            <Paper elevation={1} sx={{ borderRadius: "6px" }}>
              <Stack direction={"row"} spacing={2}>
                <Box
                  position={"relative"}
                  width={"100%"}
                  maxWidth={"250px"}
                  height={"250px"}
                  overflow={"hidden"}
                >
                  <Image
                    src={blog?.imageUrl}
                    objectFit="cover"
                    layout="fill"
                    style={{ borderRadius: "6px" }}
                    alt="blog-image"
                  />
                </Box>
                <Box py={2}>
                  <Typography variant="h5" component={"h5"} my={1}>
                    {index + 1}. {user?.name}&apos;s blogs
                  </Typography>
                  <Typography variant="subtitle1" component={"span"} my={2}>
                    {user?.name} writes about {blog?.title}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Link>
        ))}
      </Stack>
      {/* blog card end */}
    </Container>
  );
};

export default Blogs;
