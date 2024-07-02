"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Button,
  Stack,
  Container,
  Typography,
} from "@mui/material";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PPTextField from "@/components/Ui/Form/PPTextField";
import uploadImage from "@/utlis/uploadImage";
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";
import JoditEditor from "jodit-react";
import PPFileUpload from "@/components/Ui/Form/PPFileUpload";
import Title from "@/components/Ui/Title/Title";
//component start
const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // add travel api
  const [addBlog, { isLoading, isSuccess }] = useAddBlogMutation();

  // zod validation
  const createBlogValidation = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    imageUrl: z.any(),
  });
  // create a travel handler
  const handleAddTravel: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("please wait this may take a few minutes", {
      duration: 2000,
      position: "top-center",
    });
    const files = values?.imageUrl?.files;

    try {
      if (files?.length) {
        for (let i = 0; i <= files.length - 1; i++) {
          const images = files[i];
          values["imageUrl"] = await uploadImage(images);
        }
      }
      values["content"] = content;
      console.log(values);
      const res = await addBlog(values).unwrap();
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
  // default values
  const defaultValues = {
    title: "",
  };

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
            onSubmit={handleAddTravel}
            defaultValues={defaultValues}
            resolver={zodResolver(createBlogValidation)}
          >
            <Title title={"Add a Blog"} />

            <Stack direction={"column"} rowGap={2} justifyContent={"center"}>
              {/* destination  */}
              <PPTextField
                name="title"
                label="Title"
                placeholder="Title name"
              />

              {/* Description */}
              <JoditEditor
                ref={editor}
                value={content}
                // config={config}
                // tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={(newContent) => {}}
              />
              {/* Upload files */}
              <PPFileUpload name="imageUrl" placeholder="upload files" />
              <Button type="submit" color="success">
                Create Blog
              </Button>
            </Stack>
          </WrapperForm>
          {/* add a trip form end  */}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddBlog;
