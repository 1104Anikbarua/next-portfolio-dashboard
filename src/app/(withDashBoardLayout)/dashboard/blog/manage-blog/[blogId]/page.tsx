"use client";
import React, { useState, useRef } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPTextField from "@/components/Ui/Form/PPTextField";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import {
  Container,
  Button,
  Stack,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import {
  useGetBlogQuery,
  useSetBlogMutation,
} from "@/redux/features/blog/blogApi";
import SkeletonForm from "@/components/Ui/Skeleton/SkeletonForm";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import uploadImage from "@/utlis/uploadImage";
const ManageBlog = ({
  params: { blogId: id },
}: {
  params: { blogId: string };
}) => {
  // get blog api
  const {
    data,
    isLoading: isGetBlogLoading,
    isFetching: isGetBlogFetching,
  } = useGetBlogQuery({ id }, { skip: !id });
  const blog = data?.response;
  // get blog api
  const [setBlog, { isLoading: isSetBlogLoading }] = useSetBlogMutation();
  const editor = useRef(null);
  const [content, setContent] = useState(blog?.content);
  // submit handler
  const handleSetBlog: SubmitHandler<FieldValues> = async (values) => {
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
      values["id"] = blog?.id;
      values["content"] = content;
      console.log(values);
      const res = await setBlog(values).unwrap();
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
  const defaultValues = {
    title: blog?.title,
  };

  console.log({ isGetBlogLoading, isSetBlogLoading, isGetBlogFetching });
  return (
    <Container>
      <Box width={"100%"} py={10}>
        {isGetBlogLoading || isSetBlogLoading ? (
          <SkeletonForm category={"blog"} type={"form"} />
        ) : (
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
            <WrapperForm onSubmit={handleSetBlog} defaultValues={defaultValues}>
              <Typography
                component={"h3"}
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "24px" },
                  fontWeight: { xs: 600, sm: 800 },
                  opacity: "0.7",
                  my: 5,
                }}
              >
                Edit Blog
              </Typography>
              <Stack direction={"column"} rowGap={2} justifyContent={"center"}>
                {/* Title start here  */}
                <PPTextField
                  name="title"
                  label="Blog Title"
                  placeholder="Blog Title"
                />
                {/* Title start here  */}
                {/* description start here  */}
                <JoditEditor
                  ref={editor}
                  value={content as string}
                  onBlur={(newContent) => setContent(newContent)}
                />
                {/* description start here  */}
                <Button type="submit" color="success">
                  Update Blog
                </Button>
              </Stack>
            </WrapperForm>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default ManageBlog;
