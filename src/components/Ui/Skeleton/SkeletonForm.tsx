import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const SkeletonForm = ({
  category,
  type,
}: {
  category: string;
  type: string;
}) => {
  return (
    <Paper
      square={false}
      sx={{
        mx: "auto",
        width: "100%",
        textAlign: "center",
        maxWidth: "400px",
        py: 5,
        px: 2,
      }}
    >
      <Skeleton sx={{ my: 5, mx: "auto" }} width="159px" height={28}>
        <Typography>.</Typography>
      </Skeleton>
      <Stack sx={{ width: "100%", maxWidth: "386px" }} rowGap={2}>
        <Skeleton variant="rounded" height={40} animation="wave" />
        <Skeleton variant="rounded" height={40} animation="wave" />

        <Skeleton
          sx={{
            display: category === "blog" && type === "form" ? "none" : "block",
          }}
          variant="rounded"
          height={40}
          animation="wave"
        />

        <Skeleton
          sx={{
            display: category === "blog" && type === "form" ? "none" : "block",
          }}
          variant="rounded"
          height={40}
          animation="wave"
        />
      </Stack>
    </Paper>
  );
};

export default SkeletonForm;
