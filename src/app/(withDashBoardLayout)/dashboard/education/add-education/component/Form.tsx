"use client";
import { Container, Box, Paper, Button, Stack } from "@mui/material";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import PPTextField from "@/components/Ui/Form/PPTextField";
import Title from "@/components/Ui/Title/Title";
import { zodResolver } from "@hookform/resolvers/zod";
const EducationForm = ({
  submitHandler,
  zodValidationSchema,
  defaultValues,
  title,
  submitButtonText,
}: {
  submitHandler: any;
  zodValidationSchema?: any;
  defaultValues: any;
  title: any;
  submitButtonText: any;
}) => {
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
            defaultValues={defaultValues}
            resolver={
              zodValidationSchema ? zodResolver(zodValidationSchema) : undefined
            }
          >
            <Title title={title} align="left" />

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
                {submitButtonText}
              </Button>
            </Stack>
          </WrapperForm>
          {/* add a trip form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default EducationForm;
