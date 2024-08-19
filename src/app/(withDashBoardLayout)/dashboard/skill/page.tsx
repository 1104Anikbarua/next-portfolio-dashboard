"use client";
import React from "react";
import { Container, Stack, Paper, Typography, Button } from "@mui/material";
import Title from "@/components/Ui/Title/Title";
import {
  useGetSkillsQuery,
  useRemoveSkillMutation,
  useSetSkillMutation,
} from "@/redux/features/skill/skillApi";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ConfirmDialog from "@/components/Ui/Dialog/Dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { setIsModalOpen, setLaunch } from "@/redux/features/blog/blogSlice";
import { ISkill } from "@/types/skill.types";
import MyModal from "@/components/Ui/Modal/Modal";
import SkillForm from "./add-skill/Form/SkillForm";
import { toast } from "sonner";
const Skills = () => {
  // open dialog start here
  const launch = useAppSelector((state: RootState) => state.blog.launch);
  // open dialog end here
  // get skill api
  const { data, isLoading } = useGetSkillsQuery({});
  const skills = data?.response;
  // get skill api
  console.log(skills);
  // dispatch events
  const dispatch = useAppDispatch();
  // modal open state
  const isModalOpen = useAppSelector(
    (state: RootState) => state?.blog?.isModalOpen
  );
  // modal open state
  const [deleteSkill, { isLoading: isSkilldEleted }] = useRemoveSkillMutation();
  // delete skills
  const handleConfirm = async (id: string) => {
    const toastId = toast.loading("Please wait these may take few minutes", {
      duration: 2000,
      position: "top-center",
    });

    console.log(id);
    try {
      const res = await deleteSkill(id).unwrap();
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
  // delete skills

  const handleOpenDialog = () => {
    dispatch(setLaunch(true));
  };

  const handleCloseDialog = () => {
    dispatch(setLaunch(false));
  };
  return (
    <Container>
      {/* component title start */}
      <Title title={"All Skills"} align="center" />
      {/* component title end */}
      {/* skill card start  */}
      <Stack rowGap={2}>
        {skills?.map((skill) => (
          <Paper
            key={skill.id}
            elevation={1}
            sx={{ borderRadius: "6px", p: 2 }}
          >
            <Stack>
              {/* expertise skill start here  */}
              <Stack>
                <Typography
                  sx={{ textTransform: "uppercase" }}
                  variant="h5"
                  component={"h5"}
                  my={0.5}
                >
                  Expertise
                </Typography>
                <Stack direction={"row"}>
                  {skill?.expertise?.map((item, i) => (
                    <Typography key={i} variant="subtitle1" component={"span"}>
                      {" "}
                      {item} {i < skill.expertise.length - 1 ? "|" : ""}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              {/* expertise skill end here  */}
              {/* comfortable skill start here  */}
              <Stack>
                <Typography
                  sx={{ textTransform: "uppercase" }}
                  variant="h5"
                  component={"h5"}
                  my={0.5}
                >
                  Comfortable
                </Typography>
                <Stack direction={"row"}>
                  {skill?.comfortable?.map((item, i) => (
                    <Typography key={i} variant="subtitle1" component={"span"}>
                      {item} {i < skill.comfortable.length - 1 ? "|" : ""}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              {/* comfortable skill start here  */}
              {/* familiar start here  */}
              <Stack>
                <Typography
                  sx={{ textTransform: "uppercase" }}
                  variant="h5"
                  component={"h5"}
                  my={0.5}
                >
                  Familiar
                </Typography>
                <Stack direction={"row"}>
                  {skill?.familiar?.map((item, i) => (
                    <Typography key={i} variant="subtitle1" component={"span"}>
                      {item} {i < skill.familiar.length - 1 ? "|" : ""}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              {/* familiar end here  */}
              {/* Tools start here  */}
              <Stack>
                <Typography
                  sx={{ textTransform: "uppercase" }}
                  variant="h5"
                  component={"h5"}
                  my={0.5}
                >
                  Tools
                </Typography>
                <Stack direction={"row"}>
                  {skill?.tools?.map((item, i) => (
                    <Typography key={i} variant="subtitle1" component={"span"}>
                      {item} {i < skill.tools.length - 1 ? "|" : ""}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              {/* Tools end here  */}
              {/* edit skill or remove skill  */}
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
              {/* remove skill  */}
              {/* confirm delete modal  */}
              <ConfirmDialog
                title={"Are you sure you want to delete this skill?"}
                launch={launch}
                onClose={handleCloseDialog}
                onConfirm={() => handleConfirm(skill?.id)}
              />
              {/* confirm delete modal  */}
            </Stack>
            {/* edit skill  */}
            <ManageSkill
              open={isModalOpen}
              setOpen={setIsModalOpen}
              title="Edit Skill"
              skill={skill}
            />
          </Paper>
        ))}
      </Stack>
      {/* skill card end */}
    </Container>
  );
};

export default Skills;
// skill interface
interface ISkills {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  skill: ISkill;
}
import { SubmitHandler, FieldValues } from "react-hook-form";
const ManageSkill = ({ open, setOpen, title, skill }: ISkills) => {
  // edit skill by id api start here
  const [editSkill, { isLoading }] = useSetSkillMutation();
  // edit skill by id api end here
  // edit skill event hanldler
  const handleEditSkill: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait these may take few minutes", {
      duration: 2000,
      position: "top-center",
    });

    const fieldsToSplit = ["expertise", "comfortable", "familiar", "tools"];

    fieldsToSplit.forEach((field: string) => {
      if (!Array.isArray(values[field])) {
        values[field] = values[field]
          .split(",")
          .map((element: string) => element.trim());
      }
    });
    console.log(values);
    try {
      const res = await editSkill(values).unwrap();
      if (res.response.success) {
        toast.success(res.response.message, {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // edit skill defaultValues
  const defaultValues = skill ? skill : {};
  return (
    <MyModal open={open} setOpen={setOpen} title={title}>
      <SkillForm
        open={open}
        setOpen={setOpen}
        defaultValues={defaultValues}
        submitButtonText={"Edit Skill"}
        submitHandler={handleEditSkill}
        title={"Edit Skill"}
      />
    </MyModal>
  );
};
