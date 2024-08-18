"use client";
import React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useAddSkillMutation } from "@/redux/features/skill/skillApi";
import { SubmitHandler, FieldValues } from "react-hook-form";
import SkillForm from "./Form/SkillForm";
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

    // console.log(values);
    try {
      const res = await addSkill(values).unwrap();
      // console.log(res);
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
    <SkillForm
      submitButtonText="Add Skill"
      submitHandler={handleAddSkill}
      title="Add Skill"
      defaultValues={defaultValues}
      zodValidationSchema={createSkillValidationSchema}
    />
  );
};

export default AddSkill;
