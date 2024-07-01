import React from "react";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import { Card, CardContent, CardActions } from "@mui/material";
const ManageBlogSkeleton = () => {
  return (
    <Container>
      <Typography
        component="h3"
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
      {Array.from(new Array(3)).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </Container>
  );
};

export default ManageBlogSkeleton;

export const MediaCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={60} sx={{ my: 2 }} />
        <Stack
          width="100%"
          maxWidth="576px"
          my={5}
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "initial", sm: "center" }}
            justifyContent={{ xs: "initial", sm: "space-between" }}
            width="100%"
            maxWidth="200px"
          >
            <Skeleton variant="circular" width={60} height={60} />
            <Stack>
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton variant="circular" width={40} height={40} />
          </Stack>
        </Stack>
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
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
      <CardContent>
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} />
      </CardContent>
      <CardActions>
        <Skeleton variant="rectangular" width={60} height={30} />
        <Skeleton variant="rectangular" width={60} height={30} />
      </CardActions>
    </Card>
  );
};
