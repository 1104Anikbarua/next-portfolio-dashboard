"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import authImage from "@/assets/auth/login-register.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import WrapperForm from "@/components/Ui/Form/WrapperForm";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import PPTextField from "@/components/Ui/Form/PPTextField";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import loginUser from "@/serverActions/login/login";
import { setUserToken } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLoginUser: SubmitHandler<FieldValues> = async (values) => {
    setLoading(true);
    const toastId = toast.loading("This may take a moment", {
      duration: 2000,
      position: "top-center",
    });

    try {
      const res = await loginUser(values);

      if (res.success) {
        toast.success(res.message, {
          duration: 2000,
          position: "top-center",
          id: toastId,
        });

        // dispatch(baseApi.util.invalidateTags(["users", "user"]));
        //set token in local storage
        setUserToken(res.data.accessToken);
        //redirect to homepage
        router.push("/dashboard/blog/add-blog");
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(res.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        duration: 2000,
        id: toastId,
      });
    }
  };
  // login form default values
  const defaultValues = {
    email: "",
    password: "",
  };
  // login validation schema
  const loginUserSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please provide a valid email" }),
    password: z.string().min(6, { message: "Password is required" }),
  });
  return (
    <Container>
      <Stack
        height={"100vh"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        bgcolor={"white"}
        boxShadow={1}
        sx={{ columnGap: { xs: "0px", sm: "16px" } }}
      >
        <Box
          flex={1}
          sx={{
            width: "100%",
            height: "100%",
            display: { xs: "none", sm: "block" },
          }}
          position={"relative"}
        >
          <Image
            src={authImage}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="Hero Background Image"
          />
        </Box>
        <Box
          flex={1}
          sx={{
            display: { xs: "flex", sm: "initial" },
            flexDirection: { xs: "column", sm: "initial" },
            alignItems: { xs: "center", sm: "initial" },
          }}
        >
          <Typography
            component={"h3"}
            variant="h3"
            sx={{
              fontSize: { xs: "24px" },
              fontWeight: { xs: 600, sm: 800 },
              opacity: "0.7",
              margin: { xs: "10px auto", sm: "10px 0px 10px 100px" },
              maxWidth: { xs: "100%" },
            }}
          >
            Login
          </Typography>
          <WrapperForm
            onSubmit={handleLoginUser}
            resolver={zodResolver(loginUserSchema)}
            defaultValues={defaultValues}
          >
            <Stack rowGap={2} sx={{ width: "100%", maxWidth: "300px" }}>
              <PPTextField name="email" type="email" label="Email" />
              <PPTextField name="password" type="password" label="Password" />

              <LoadingButton
                type="submit"
                size="small"
                loading={loading}
                variant="contained"
                color="success"
              >
                Login
              </LoadingButton>
              <Typography component={"p"} variant="body2">
                New to Amigo? please{" "}
                <Link href={"/register"} style={{ textDecoration: "none" }}>
                  Register
                </Link>
              </Typography>
            </Stack>
          </WrapperForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
