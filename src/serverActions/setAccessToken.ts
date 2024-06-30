"use server";
import { authKey } from "@/constant/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// option type
interface IOption {
  redirect: string;
}
//set accesstoken in cookies and redirect user to role base dashboard
export const setAccessTokenInCookies = (token: string, option?: IOption) => {
  //set accesstoken in cookies
  cookies().set(authKey, token);
  //redirect user in the dashbaord
  if (option && option) {
    redirect(option.redirect);
  }
};
