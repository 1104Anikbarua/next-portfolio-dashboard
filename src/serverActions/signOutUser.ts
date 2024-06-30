import { authKey } from "@/constant/constant";
import { logOutUser } from "@/services/auth.services";
import { removeTokenFromCookies } from "@/utlis/cookies";

export const signOutUser = () => {
  removeTokenFromCookies([authKey, "refreshToken"]);
  logOutUser();
};
