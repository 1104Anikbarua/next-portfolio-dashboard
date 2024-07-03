"use client";
import React from "react";
import { Container, Typography, Stack, Paper, Button } from "@mui/material";
import {
  useGetEducationsQuery,
  useSetEducationMutation,
} from "@/redux/features/education/educationApi";
import Title from "@/components/Ui/Title/Title";
import Link from "next/link";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EducationForm from "./add-education/component/Form";
import MyModal from "@/components/Ui/Modal/Modal";
//
const Educations = () => {
  // modal close open & close state
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          // <Link
          //   href={`education/${education.id}`}
          //   style={{ textDecoration: "none" }}
          // key={education.id}
          // >
          <Paper
            key={education.id}
            elevation={1}
            sx={{ borderRadius: "6px", p: 2 }}
          >
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
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Button
                  sx={{ height: "40px" }}
                  color="info"
                  startIcon={<EditNoteIcon />}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  {/* <Link
                      style={{ textDecoration: "none", color: "white" }}
                      href={`/dashboard/blog/${blog?.id}/edit`}
                      
                    >
                    </Link> */}
                  Edit
                </Button>
                <Button
                  sx={{ height: "40px" }}
                  // onClick={handleClickOpen}
                  startIcon={<DeleteSweepIcon />}
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
          // </Link>
        ))}
      </Stack>
      {/* blog card end */}
      {/* edit education  */}
      <ManageEducation open={isModalOpen} setOpen={setIsModalOpen} title="" />
    </Container>
  );
};

export default Educations;

import { useState } from "react";
import { toast } from "sonner";
import { SubmitHandler, FieldValues } from "react-hook-form";

type IModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};
export const ManageEducation = ({ open, setOpen, title }: IModalProps) => {
  // const defaultValues = {};
  const [editEducation, { isLoading }] = useSetEducationMutation();
  // manage education event handler
  const handleEditEducation: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });
    console.log(values);
    try {
      const res = await editEducation(values).unwrap();
      console.log(res);
      if (res?.response?.success) {
        toast.success(res?.response?.message, {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createEducationValidationSchema = {};
  return (
    <MyModal open={open} setOpen={setOpen} title={title}>
      <EducationForm
        submitButtonText={"Submit"}
        submitHandler={handleEditEducation}
        title={"Edit Education"}
        zodValidationSchema={createEducationValidationSchema}
      />
    </MyModal>
  );
};
