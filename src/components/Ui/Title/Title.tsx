import React from "react";
import { Typography } from "@mui/material";
const Title = ({ title, align }: { title: string; align: string }) => {
  return (
    <Typography
      component={"h3"}
      variant="h3"
      sx={{
        fontSize: { xs: "24px" },
        fontWeight: { xs: 600, sm: 800 },
        opacity: "0.7",
        my: 5,
        textAlign: { align },
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
