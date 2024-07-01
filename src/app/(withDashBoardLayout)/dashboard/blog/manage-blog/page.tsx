"use client";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
const ManageBlog = () => {
  // get all blogs api
  const { data, isFetching, isLoading } = useGetBlogsQuery({});
  const blogs = data?.response;
  // get all blogs api
  //get me api
  const { data: response, isFetching: isUserFetching } = useGetMeQuery({});
  const user = response?.data;
  console.log(user);
  //get me api

  return (
    <Container>
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
      {blogs?.map((blog) => (
        <MediaCard blog={blog} key={blog.id} user={user} />
      ))}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {/* <Image
          fill
          src={data.imageUrl}
          style={{ objectFit: "cover" }}
          alt="blog-image"
        /> */}
      </Box>
    </Container>
  );
};

export default ManageBlog;

// import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

export function MediaCard({ blog, user }: { blog: IBlog; user: any }) {
  return (
    <Card>
      <CardContent>
        {/* Blog title start here */}
        <ResponsiveTypography blog={blog} />
        {/* Blog title ends here */}
        <Stack
          width={"100%"}
          maxWidth={"576px"}
          my={5}
          direction={"row"}
          justifyContent={"space-between"}
        >
          {/* author image and posted date section  */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "initial", sm: "center" }}
            justifyContent={{ xs: "initial", sm: "space-between" }}
            width={"100%"}
            maxWidth={"200px"}
          >
            <Box
              position={"relative"}
              width={"100%"}
              maxWidth={"60px"}
              height={"60px"}
            >
              <Image
                src={user?.imageUrl}
                objectFit="cover"
                layout="fill"
                style={{ borderRadius: "50%" }}
                alt="user image"
              />
            </Box>
            <Stack>
              <Typography component={"p"} variant="h6">
                {"Anik Barua"}
              </Typography>
              <Typography component={"p"} variant="h6">
                {dayjs(blog?.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Stack>
          </Stack>
          {/* author image and posted date section ends here */}
          {/* share in social network  */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography component={"p"} variant="h6">
              100
            </Typography>
            <IconButton color="secondary">
              <ShareIcon />
            </IconButton>
          </Stack>
          {/* share in social network  */}
        </Stack>
      </CardContent>
      <CardMedia
        sx={{ height: 340 }}
        image={blog.imageUrl}
        title="green iguana"
      />
      <CardContent>
        {blog.content}
        {/* <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}

//typography
import { useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useGetMeQuery } from "@/redux/features/user/userApi";

export const ResponsiveTypography = ({ blog }: { blog: IBlog }) => {
  const theme = useTheme();

  // Define breakpoints
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Determine component and variant based on breakpoints
  let component;
  let variant;

  if (isXs) {
    component = "h6";
    variant = "h6";
  } else if (isSm) {
    component = "h4";
    variant = "h4";
  } else {
    component = "h3";
    variant = "h3";
  }

  return (
    <Typography
      component={component as any}
      variant={variant as any}
      sx={{
        fontSize: { xs: "24px", sm: "30px", md: "36px" },
        fontWeight: { xs: 600, sm: 900 },
        my: 5,
      }}
    >
      {blog?.title}
    </Typography>
  );
};
