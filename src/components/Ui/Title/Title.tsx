import React from "react";
import { Typography } from "@mui/material";
const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      component={"h3"}
      variant="h3"
      sx={{
        fontSize: { xs: "24px" },
        fontWeight: { xs: 600, sm: 800 },
        opacity: "0.7",
        my: 5,
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
