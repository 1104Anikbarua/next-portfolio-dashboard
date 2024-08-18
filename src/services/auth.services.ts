import { authKey } from "@/constant/constant";
import { axiosInstance } from "@/helpers/axiosInstance/axiosInstance";
import { IUser } from "@/types/global";
import getDecodedToken from "@/utlis/decodeJwtToken";
import { getToken, removeToken, setToken } from "@/utlis/localStorage";
// store token in localstorage
const setUserToken = (token: string) => {
  return setToken(authKey, token);
};
// get token from localstorage
const getUserToken = () => {
  const token = getToken(authKey);
  if (token) {
    const decoded = getDecodedToken(token) as IUser;
    console.log(decoded);
    return {
      ...decoded,
      role: decoded?.role?.toLowerCase(),
    };
  }
};
// check is user logged in or not
const isUserLoggedIn = () => {
  const token = getToken(authKey);
  if (token) {
    return !!token;
  }
};
// logout user from app
const logOutUser = () => {
  const token = getToken(authKey);
  if (token) {
    removeToken(authKey);
  }
};
// generate access token
const generateAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_REFRESH_API}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
export {
  setUserToken,
  getUserToken,
  isUserLoggedIn,
  logOutUser,
  generateAccessToken,
};
