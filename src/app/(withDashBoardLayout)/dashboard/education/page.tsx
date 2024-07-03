"use client";
import React from "react";
import { Container, Typography, Stack, Paper } from "@mui/material";
import { useGetEducationsQuery } from "@/redux/features/education/educationApi";
import Title from "@/components/Ui/Title/Title";
import Link from "next/link";
//
const Educations = () => {
  // get all blogs api
  const { data, isLoading, error } = useGetEducationsQuery({});
  const educations = data?.response;
  // get all blogs api

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Typography color="error">Failed to load data</Typography>;
  }
  return (
    <Container>
      {/* component title start */}
      <Title title={"All Educations"} align="center" />
      {/* component title end */}
      {/* blog card start  */}
      <Stack rowGap={2}>
        {educations?.map((education) => (
          <Link
            href={`education/${education.id}`}
            style={{ textDecoration: "none" }}
            key={education.id}
          >
            <Paper elevation={1} sx={{ borderRadius: "6px", p: 2 }}>
              <Stack direction={"row"} spacing={2}>
                {/* education start here  */}
                <Stack>
                  <Typography
                    sx={{ textTransform: "uppercase" }}
                    variant="h5"
                    component={"h5"}
                    my={0.5}
                  >
                    education
                  </Typography>
                  <Typography variant="h6" component={"h6"}>
                    {education.examType}
                  </Typography>
                </Stack>
                {/* education end here  */}
                {/* institution start here  */}
                <Stack>
                  <Typography
                    sx={{ textTransform: "uppercase" }}
                    variant="h5"
                    component={"h5"}
                    my={0.5}
                  >
                    Institution
                  </Typography>
                  <Typography variant="h6" component={"h6"}>
                    {education.institutionName}
                  </Typography>
                </Stack>
                {/* institution end here  */}
                {/* completion start here  */}
                <Stack>
                  <Typography
                    sx={{ textTransform: "uppercase" }}
                    variant="h5"
                    component={"h5"}
                    my={0.5}
                  >
                    Completion year
                  </Typography>
                  <Typography variant="h6" component={"h6"}>
                    {education?.passingYear}
                  </Typography>
                </Stack>
                {/* completion end here  */}
                {/* cgpa start here  */}
                <Stack>
                  <Typography
                    sx={{ textTransform: "uppercase" }}
                    variant="h5"
                    component={"h5"}
                    my={0.5}
                  >
                    Cgpa
                  </Typography>
                  <Typography variant="h6" component={"h6"}>
                    {education?.cgpa}
                  </Typography>
                </Stack>
                {/* cgpa end here  */}
              </Stack>
            </Paper>
          </Link>
        ))}
      </Stack>
      {/* blog card end */}
    </Container>
  );
};

export default Educations;
