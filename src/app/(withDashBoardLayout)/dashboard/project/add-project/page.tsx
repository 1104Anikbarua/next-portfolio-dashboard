"use client";
import React from "react";
import ProjectForm from "./component/Form";
import { z } from "zod";
import { toast } from "sonner";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { useAddProjectMutation } from "@/redux/features/project/projectApi";

const AddProject = () => {
  //add project api start here
  const [addProject, { isLoading }] = useAddProjectMutation();
  // add project submit handler
  const handleAddProject: SubmitErrorHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait these may take few minutes", {
      duration: 2000,
      position: "top-center",
    });
    console.log(values);
    try {
      const res = await addProject(values).unwrap();
      if (res.response.success) {
        toast.success("Project add successfully", {
          duration: 2000,
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // default values
  const defaultValues = {
    projectName: "",
    githubClientLink: "",
    githubServerLink: "",
    liveSiteLink: "",
    technologies: "",
    featureOne: "",
    featureTwo: "",
    featureThree: "",
  };
  // form validation Schema

  const zodValidationSchema = z.object({
    projectName: z.string().min(1, { message: "Project name is required" }),
    githubClientLink: z
      .string()
      .min(1, { message: "Github client link is required" }),
    githubServerLink: z
      .string()
      .min(1, { message: "Github server link is required" }),
    liveSiteLink: z.string().min(1, { message: "Live site link is required" }),
    technologies: z.string().min(1, { message: "Technologies is required" }),
    featureOne: z.string().min(1, { message: "Feature one is required" }),
    featureTwo: z.string().min(1, { message: "Feature Two is required" }),
    featureThree: z.string().min(1, { message: "Feature Three is required" }),
  });
  return (
    <ProjectForm
      defaultValues={defaultValues}
      submitButtonText="Add Project"
      title="Add Project"
      submitHandler={handleAddProject}
      zodValidationSchema={zodValidationSchema}
    />
  );
};

export default AddProject;
