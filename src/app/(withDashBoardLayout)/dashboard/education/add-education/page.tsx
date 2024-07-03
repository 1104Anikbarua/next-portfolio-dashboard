"use client";
import { Container, Box, Paper, Button, Stack } from "@mui/material";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import PPTextField from "@/components/Ui/Form/PPTextField";
import Title from "@/components/Ui/Title/Title";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAddEducationMutation } from "@/redux/features/education/educationApi";
// function start
const AddEducation = () => {
  const [addEducation, { isLoading }] = useAddEducationMutation();
  // add education event handler
  const handleAddEducation: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });
    console.log(values);
    try {
      const res = await addEducation(values).unwrap();
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
    examType: "",
    institutionName: "",
    passingYear: "",
    cgpa: "",
  };
  // education validation schema
  const createEducationValidationSchema = z.object({
    examType: z
      .string()
      .min(1, { message: "Education/certificate type is required" }),
    institutionName: z
      .string()
      .min(1, { message: "Institution name is required" }),
    passingYear: z.string().min(1, { message: "Passing year is required" }),
    cgpa: z.coerce.number().positive({ message: "Cgpa is required" }),
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
            onSubmit={handleAddEducation}
            defaultValues={defaultValues}
            resolver={zodResolver(createEducationValidationSchema)}
          >
            <Title title={"Add an Education"} align="left" />

            <Stack direction={"column"} rowGap={2} justifyContent={"center"}>
              {/* Education name */}
              <PPTextField
                name="examType"
                label="Degree Name or certificate type"
                placeholder="Education name"
              />
              {/* Institution name */}
              <PPTextField
                name="institutionName"
                label="Institution Name"
                placeholder="Institution name"
              />
              {/* Passing year */}
              <PPTextField
                name="passingYear"
                label="Passing Year"
                placeholder="Passing year"
              />
              {/* Cgpa */}
              <PPTextField name="cgpa" label="Cgpa or gpa" placeholder="Cgpa" />

              <Button type="submit" color="success">
                Create Education
              </Button>
            </Stack>
          </WrapperForm>
          {/* add a trip form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddEducation;
