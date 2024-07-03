"use client";
import React from "react";
import { Container, Box, Paper, Stack, Button } from "@mui/material";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import { z } from "zod";
import { toast } from "sonner";
import { useAddSkillMutation } from "@/redux/features/skill/skillApi";
import { SubmitHandler, FieldValues } from "react-hook-form";
import Title from "@/components/Ui/Title/Title";
import { zodResolver } from "@hookform/resolvers/zod";
import PPTextField from "@/components/Ui/Form/PPTextField";
// component start
const AddSkill = () => {
  const [addSkill, { isLoading }] = useAddSkillMutation();
  // add education event handler
  const handleAddSkill: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });
    const fieldsToSplit = ["expertise", "comfortable", "familiar", "tools"];

    fieldsToSplit.forEach((field) => {
      if (values[field]) {
        values[field] = values[field]
          .split(",")
          .map((item: string) => item.trim());
      }
    });

    console.log(values);
    try {
      const res = await addSkill(values).unwrap();
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
  // default values for form
  const defaultValues = {
    expertise: "",
    comfortable: "",
    familiar: "",
    tools: "",
  };
  // education validation schema
  const createSkillValidationSchema = z.object({
    expertise: z.string().min(1, { message: "Expertise is required" }),
    comfortable: z.string().min(1, { message: "Comfortable is required" }),
    familiar: z.string().min(1, { message: "Familiar is required" }),
    tools: z.string().min(1, { message: "Tools is required" }),
  });
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
            onSubmit={handleAddSkill}
            defaultValues={defaultValues ? defaultValues : undefined}
            resolver={
              createSkillValidationSchema
                ? zodResolver(createSkillValidationSchema)
                : undefined
            }
          >
            <Title title={"Add Skill"} align="left" />

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
                // onClick={() => dispatch(setIsModalOpen(false))}
                type="submit"
                color="success"
              >
                {/* {submitButtonText} */}
                Create Skill
              </Button>
            </Stack>
          </WrapperForm>
          {/* add a skills form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddSkill;
