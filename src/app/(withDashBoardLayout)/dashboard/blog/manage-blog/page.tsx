"use client";
import { useGetBlogsQuery } from "@/redux/features/blog/blogApi";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";

const ManageBlog = () => {
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
  console.log(user);
  //get me api

  if (isLoading || isUserFetching) {
    return <ManageBlogSkeleton />;
  }

  if (error || userError) {
    return <Typography color="error">Failed to load data</Typography>;
  }
  return (
    <Container>
      {/* component title  */}
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
      {/* component title  */}
      <Stack rowGap={2}>
        {blogs?.map((blog) => (
          <MediaCard blog={blog} key={blog.id} user={user} />
        ))}
      </Stack>
    </Container>
  );
};

export default ManageBlog;

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
export const MediaCard = ({
  blog,
  user,
}: {
  blog: IBlog;
  user: IUser | undefined;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  //redirect to the edit blog route
  const router = useRouter();
  const handleRedirect = (id: string) => {
    router.push(`manage-blog/${id}`);
  };
  //redirect to the edit blog route
  // open social share menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // open social share menu
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
                src={user?.imageUrl as string | StaticImport}
                objectFit="cover"
                layout="fill"
                style={{ borderRadius: "50%" }}
                alt="user image"
              />
            </Box>
            <Stack>
              <Typography component={"p"} variant="h6">
                {user?.name}
              </Typography>
              <Typography component={"p"} variant="h6">
                {dayjs(blog?.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Stack>
          </Stack>
          {/* author image and posted date section ends here */}
          {/* share in social network  */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              color="secondary"
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <ShareIcon />
            </IconButton>
          </Stack>
          {/* share in social network  */}
        </Stack>
        <FadeMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} open={open} />
      </CardContent>

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: 0,
          pb: "56.25%",
          m: "0 auto",
        }}
      >
        <Image
          src={blog?.imageUrl}
          alt="blog-image"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleRedirect(blog.id)}>
          Edit
        </Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

//typography
import { useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { IBlog } from "@/types/blog.types";
import { IUser } from "@/types/user.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ManageBlogSkeleton from "@/components/Ui/Skeleton/ManageBlogSkeleton";
import { useRouter } from "next/navigation";
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
        my: 2,
      }}
    >
      {blog?.title}
    </Typography>
  );
};

// share button dropdown
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

export function FadeMenu({
  anchorEl,
  setAnchorEl,
  open,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  open: boolean;
}) {
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(anchorEl);
  return (
    <div>
      {/* <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
