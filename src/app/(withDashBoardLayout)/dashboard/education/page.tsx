"use client";
import React from "react";
import { Container, Typography, Stack, Paper, Button } from "@mui/material";
import {
  useGetEducationsQuery,
  useRemoveEducationMutation,
  useSetEducationMutation,
} from "@/redux/features/education/educationApi";
import Title from "@/components/Ui/Title/Title";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EducationForm from "./add-education/component/Form";
import MyModal from "@/components/Ui/Modal/Modal";
import { setIsModalOpen, setLaunch } from "@/redux/features/blog/blogSlice";
//
const Educations = () => {
  // get launch slice value
  const launch = useAppSelector((state: RootState) => state.blog.launch);
  // modal close open & close state
  const isModalOpen = useAppSelector(
    (state: RootState) => state.blog.isModalOpen
  );
  // *Dispatch*
  const dispatch = useAppDispatch();
  // get launch slice value

  const router = useRouter();
  // get all blogs api
  const { data, isLoading, error } = useGetEducationsQuery({});
  const educations = data?.response;
  console.log(educations);
  // get all blogs api

  // delete education api
  const [removeEducation, { isLoading: isRemoveEducationLoading }] =
    useRemoveEducationMutation();
  // delete education api

  // remove education handler
  const handleConfirm = async (id: string) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });
    try {
      const res = await removeEducation(id).unwrap();

      if (res?.response?.success) {
        toast.success(res?.response?.message, {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });
      }
      router.push("/dashboard/education");
    } catch (error) {
      console.log(error);
    }
    dispatch(setLaunch(false));
  };
  // remove education handler end
  // open modal start
  const handleOpenDialog = () => {
    dispatch(setLaunch(true));
  };
  // open modal end
  // close modal start
  const handleCloseDialog = () => {
    dispatch(setLaunch(false));
  };
  // close modal end

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
      {/* education card start  */}
      <Stack rowGap={2}>
        {educations?.map((education) => (
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
              {/* edit education or remove education  */}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Button
                  sx={{ height: "40px" }}
                  color="info"
                  startIcon={<EditNoteIcon />}
                  onClick={() => dispatch(setIsModalOpen(!isModalOpen))}
                >
                  Edit
                </Button>
                <Button
                  sx={{ height: "40px" }}
                  onClick={handleOpenDialog}
                  startIcon={<DeleteSweepIcon />}
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </Stack>
              {/* remove education  */}
              {/* confirm delete modal  */}
              <ConfirmDialog
                title={"Are you sure you want to delete this education?"}
                launch={launch}
                onClose={handleCloseDialog}
                onConfirm={() => handleConfirm(education?.id)}
              />
              {/* confirm delete modal  */}
            </Stack>
            {/* edit education  */}
            <ManageEducation
              open={isModalOpen}
              setOpen={setIsModalOpen}
              title=""
              education={education}
            />
          </Paper>
        ))}
      </Stack>
      {/* education card end */}
    </Container>
  );
};

export default Educations;
// manage education start
import { toast } from "sonner";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { IEducation } from "@/types/education.types";
import ConfirmDialog from "@/components/Ui/Dialog/Dialog";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";

type IModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  education: IEducation;
};
export const ManageEducation = ({
  open,
  setOpen,
  title,
  education,
}: IModalProps) => {
  // edit education by id api
  const [editEducation, { isLoading }] = useSetEducationMutation();
  // edit education by id api
  // manage education event handler
  const handleEditEducation: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });

    values["cgpa"] = Number(values.cgpa);
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
  // edit eduction defaultValues
  const defaultValues = education ? education : {};

  return (
    <MyModal open={open} setOpen={setOpen} title={title}>
      <EducationForm
        open={open}
        setOpen={setOpen}
        defaultValues={defaultValues}
        submitButtonText={"Edit"}
        submitHandler={handleEditEducation}
        title={"Edit Education"}
      />
    </MyModal>
  );
};
// manage education end
