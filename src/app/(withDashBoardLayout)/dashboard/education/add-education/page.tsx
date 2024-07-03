"use client";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useAddEducationMutation } from "@/redux/features/education/educationApi";
import EducationForm from "./component/Form";
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
    <EducationForm
      defaultValues={defaultValues}
      submitButtonText={"Create Education"}
      submitHandler={handleAddEducation}
      title={"Create an Education"}
      zodValidationSchema={createEducationValidationSchema}
    />
  );
};

export default AddEducation;
