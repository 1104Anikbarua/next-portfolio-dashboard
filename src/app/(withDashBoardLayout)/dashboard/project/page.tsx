"use client";
import Title from "@/components/Ui/Title/Title";
import {
  useGetProjectsQuery,
  useRemoveProjectMutation,
  useSetProjectMutation,
} from "@/redux/features/project/projectApi";
import {
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { EditNote, DeleteSweep } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ConfirmDialog from "@/components/Ui/Dialog/Dialog";
import { RootState } from "@/redux/store";
import { setIsModalOpen, setLaunch } from "@/redux/features/blog/blogSlice";
import { IProject } from "@/types/project.types";
import MyModal from "@/components/Ui/Modal/Modal";
import ProjectForm from "./add-project/component/Form";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Project = () => {
  //   open delete modal
  const launch = useAppSelector((state: RootState) => state.blog.launch);
  //   open edit modal
  const isModalOpen = useAppSelector(
    (state: RootState) => state.blog.isModalOpen
  );
  // get all project api start here
  const { data, isLoading } = useGetProjectsQuery({});
  const projects = data?.response;
  console.log(projects, isLoading);
  // get all project api end here
  const dispatch = useAppDispatch();
  //
  const [deleteProject, { isLoading: isDeleteLoading }] =
    useRemoveProjectMutation();
  // delete project event handler
  const handleConfirmDelete = async (id: string) => {
    const toastId = toast.loading("Please wait these may take few minutes", {
      duration: 2000,
      position: "top-center",
    });

    // console.log(id);
    try {
      const res = await deleteProject(id).unwrap();
      if (res.response.success) {
        toast.success("Skill deleted successfully", {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });
      }
      dispatch(setLaunch(false));
    } catch (error) {
      console.log(error);
    }
  };
  // open edit modal
  const handleOpenDialog = () => {
    dispatch(setLaunch(true));
  };
  // close edit modal
  const handleCloseDialog = () => {
    dispatch(setLaunch(false));
  };
  return (
    <Container>
      {/* component title start here  */}
      <Title title="All Projects" align="left" />
      {/* component title ends here  */}
      <Stack spacing={2}>
        {projects?.map((project) => (
          <Paper key={project.id} sx={{ borderRadius: "6px", p: 2 }}>
            <Stack rowGap={2}>
              {/* project name & links start here */}
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant="h6"
                  component={"h6"}
                  sx={{ fontWeight: "bold" }}
                >
                  {project?.projectName}
                </Typography>
                <Link
                  href={project.githubClientLink}
                  underline="none"
                  color={"blue"}
                >
                  Github Client
                </Link>
                <Link
                  href={project.githubServerLink}
                  underline="none"
                  color={"blue"}
                >
                  Github Server
                </Link>
                <Link
                  href={project.liveSiteLink}
                  underline="none"
                  color={"blue"}
                >
                  Live Site
                </Link>
              </Stack>
              {/* project name & links end here */}

              {/* project feature start here  */}
              <Stack rowGap={1}>
                {/* feature one start here  */}
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      color: "black",
                      backgroundColor: "black",
                      border: "1px solid black",
                      width: "20px",
                      height: "10px",
                      borderRadius: "50%",
                      mx: 2,
                      mt: 0.7,
                    }}
                    component={"p"}
                    variant="h6"
                  ></Typography>
                  <Typography>{project.featureOne}</Typography>
                </Stack>
                {/* feature two start here  */}
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      color: "black",
                      backgroundColor: "black",
                      border: "1px solid black",
                      width: "20px",
                      height: "10px",
                      borderRadius: "50%",
                      mx: 2,
                      mt: 0.7,
                    }}
                    component={"p"}
                    variant="h6"
                  ></Typography>
                  <Typography>{project.featureTwo}</Typography>
                </Stack>
                {/* feature three start here */}
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    sx={{
                      color: "black",
                      backgroundColor: "black",
                      border: "1px solid black",
                      width: "20px",
                      height: "10px",
                      borderRadius: "50%",
                      mx: 2,
                    }}
                    component={"p"}
                    variant="h6"
                  />
                  <Typography>{project.featureOne}</Typography>
                </Stack>
              </Stack>
              {/* project feature end here  */}
              {/* technologies start here  */}
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="h6"
                component={"span"}
              >
                Technologies:{" "}
                <Typography component={"span"}>
                  {" "}
                  {project.technologies}
                </Typography>
              </Typography>
              {/* remove project or edit project start here */}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Button
                  sx={{ height: "40px" }}
                  color="info"
                  startIcon={<EditNote />}
                  onClick={() => dispatch(setIsModalOpen(!isModalOpen))}
                >
                  Edit
                </Button>
                <Button
                  sx={{ height: "40px" }}
                  onClick={handleOpenDialog}
                  startIcon={<DeleteSweep />}
                  color="error"
                  size="small"
                >
                  Delete
                </Button>
              </Stack>
              {/* remove project or edit project start here */}
              {/* confirm Delete modal  */}
              <ConfirmDialog
                title="Are you sure you want to delete this project"
                launch={launch}
                onClose={handleCloseDialog}
                onConfirm={() => handleConfirmDelete(project?.id)}
              />
              {/* confirm Delete modal  */}
            </Stack>
            {/* edit project modal  */}
            <ManageProject
              open={isModalOpen}
              setOpen={setIsModalOpen}
              title="Edit Project"
              project={project}
            />
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};

export default Project;

// project interface
interface IProjects {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  project: IProject;
}
const ManageProject = ({ open, setOpen, title, project }: IProjects) => {
  const [editProject, { isLoading }] = useSetProjectMutation();
  //   edit project handler
  const handleEditProject: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait these may take few minutes", {
      duration: 2000,
      position: "top-center",
    });

    try {
      const res = await editProject(values).unwrap();
      //   console.log(res);
      if (res.response.success) {
        toast.success("Project Edit successfully", {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const defaultValues = project ? project : {};
  return (
    <MyModal open={open} setOpen={setOpen} title={title}>
      <ProjectForm
        open={open}
        setOpen={setOpen}
        defaultValues={defaultValues}
        submitButtonText={"Edit Project"}
        submitHandler={handleEditProject}
        title={"Edit Project"}
      />
    </MyModal>
  );
};
