import PPTextField from "@/components/Ui/Form/PPTextField";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import Title from "@/components/Ui/Title/Title";
import { setIsModalOpen } from "@/redux/features/blog/blogSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper, Stack } from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ProjectForm = ({
  submitHandler,
  defaultValues,
  title,
  zodValidationSchema,
  submitButtonText,
  open,
  setOpen,
}: {
  submitHandler: SubmitHandler<FieldValues>;
  title: string;
  defaultValues: Record<string, unknown>;
  zodValidationSchema?: any;
  submitButtonText: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // dispatch the event
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Box width={"100%"} py={10}>
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
          {/* add a project form  start*/}
          <WrapperForm
            onSubmit={submitHandler}
            defaultValues={defaultValues ? defaultValues : undefined}
            resolver={
              zodValidationSchema ? zodResolver(zodValidationSchema) : undefined
            }
          >
            <Title title={title} align="left" />

            <Stack direction={"column"} rowGap={2} justifyContent={"center"}>
              {/* Project name */}
              <PPTextField
                name="projectName"
                label="Project Name"
                placeholder="Project name"
              />
              {/* Github client Link */}
              <PPTextField
                name="githubClientLink"
                label="Github Client Link"
                placeholder="Github Client Link"
              />
              {/* Github Server Link */}
              <PPTextField
                name="githubServerLink"
                label="Github Server Link"
                placeholder="Github Server Link"
              />
              {/* Live Site Link*/}
              <PPTextField
                name="liveSiteLink"
                label="Live Site Link"
                placeholder="Live Site Link"
              />
              {/* Technologies */}
              <PPTextField
                name="technologies"
                label="Technologies"
                placeholder="Technologies"
              />
              {/* Features */}
              <PPTextField
                name="featureOne"
                label="Features One"
                placeholder="Features One"
              />
              {/* Features */}
              <PPTextField
                name="featureTwo"
                label="Features Two"
                placeholder="Features Two"
              />
              {/* Features */}
              <PPTextField
                name="featureThree"
                label="Features Three"
                placeholder="Features Three"
              />

              <Button
                onClick={() => dispatch(setIsModalOpen(false))}
                type="submit"
                color="success"
              >
                {submitButtonText}
              </Button>
            </Stack>
          </WrapperForm>
          {/* add a project form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProjectForm;
