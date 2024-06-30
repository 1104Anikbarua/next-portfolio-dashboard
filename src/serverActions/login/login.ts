import { FieldValues } from "react-hook-form";
import { setAccessTokenInCookies } from "../setAccessToken";
// import { setAccessTokenInCookies } from "../setAccessToken";
// import getDecodedToken from "@/utlis/decodeToken";

const loginUser = async (userInfo: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
    cache: "no-cache",
    credentials: "include", //to store refreseh token in cookie
  });

  const buddy = await res.json();

  //   const { role } = getDecodedToken(buddy.data.accessToken);
  setAccessTokenInCookies(
    buddy?.data?.accessToken
    //   , {
    //   redirect: `/dashboard/${role.toLowerCase()}`,
    // }
  );
  // do this parts in a functions
  // if (buddy.data.accessToken) {
  //   cookies().set(authKey, buddy?.data?.accessToken);
  //   redirect("/dashboard");
  // }
  return buddy;
};
export default loginUser;
