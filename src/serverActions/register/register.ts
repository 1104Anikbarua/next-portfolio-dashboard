"use server";
import { FieldValues } from "react-hook-form";
import { setAccessTokenInCookies } from "../setAccessToken";
// send user data to server and register user
const registerUser = async (formValues: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/create-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
      cache: "no-cache", //don't cache the user data
      credentials: "include",
    }
  );
  const buddy = await res.json();
  setAccessTokenInCookies(buddy?.data?.accessToken);
  return buddy;
};
export default registerUser;
