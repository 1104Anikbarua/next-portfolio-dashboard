import React from "react";
import { Button, Container, Box, Paper, Stack } from "@mui/material";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import PPTextField from "@/components/Ui/Form/PPTextField";
import Title from "@/components/Ui/Title/Title";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setIsModalOpen } from "@/redux/features/blog/blogSlice";
const SkillForm = ({
  submitHandler,
  zodValidationSchema,
  defaultValues,
  title,
  submitButtonText,
  setOpen,
  open,
}: {
  submitHandler: SubmitHandler<FieldValues>;
  zodValidationSchema?: any;
  defaultValues?: Record<string, unknown>;
  title: string;
  submitButtonText: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}) => {
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
          {/* add a trip form  start*/}
          <WrapperForm
            onSubmit={submitHandler}
            defaultValues={defaultValues ? defaultValues : undefined}
            resolver={
              zodValidationSchema ? zodResolver(zodValidationSchema) : undefined
            }
          >
            <Title title={title} align="left" />

            <Stack direction={"column"} rowGap={2} justifyContent={"center"}>
              {/* Skills name */}
              <PPTextField
                name="expertise"
                label="Expertise Skills"
                placeholder="Expertise skills name"
              />
              {/* Comfortable skills name */}
              <PPTextField
                name="comfortable"
                label="Comfortable Skills"
                placeholder="Comfortable skills name"
              />
              {/* Familiar skills name */}
              <PPTextField
                name="familiar"
                label="Familiar Skills"
                placeholder="Familiar skills name"
              />
              {/* tools  */}
              <PPTextField
                name="tools"
                label="Tools"
                placeholder="Tools name"
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
          {/* add a skills form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default SkillForm;
