"use server";
import { cookies } from "next/headers";

export const removeTokenFromCookies = (keys: string[]) => {
  // remove delete token
  keys.forEach((key) => cookies().delete(key));
};
