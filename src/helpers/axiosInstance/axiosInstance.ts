import { authKey } from "@/constant/constant";
import { setAccessTokenInCookies } from "@/serverActions/setAccessToken";
import { generateAccessToken } from "@/services/auth.services";
import { IErrorResponse } from "@/types/global";
import { getToken, setToken } from "@/utlis/localStorage";
import axios from "axios";

export const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getToken(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    console.log({ response });
    const responseObject = {
      data: response.data,
      // meta: response.data.meta,
    };
    console.log(responseObject);
    return responseObject;
  },
  async function (error) {
    // assign config property
    const config = error?.config;
    // && !config.sent
    if (error.response.data.statusCode === 403) {
      // set config.sent =true to send the refresh token to the server only once
      // config.sent = true;
      // get generated accessToken
      const result = await generateAccessToken();
      const accessToken = result?.data;
      // set token in headers
      config.headers["Authorization"] = accessToken;
      // store token in local storage
      setToken(authKey, accessToken);
      setAccessTokenInCookies(accessToken);
      return axiosInstance(config);
    } else {
      const errorResponseObject: IErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorDetails: error?.response?.data?.errorDetails,
      };
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // return errorResponseObject;
      return Promise.reject(errorResponseObject);
    }
  }
);
