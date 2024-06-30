// import { USER_ROLE } from "@/constant/constant";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface IErrorResponse {
  statusCode: number;
  message: string;
  errorDetails: {
    path: string | number;
    message: string;
  }[];
}
// pagination meta info
export interface IMeta {
  pages: number;
  limits: number;
  total: number;
}
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
// export type IUserRole = keyof typeof USER_ROLE;
export interface IMenuItems {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  children?: IMenuItems[];
}

export type TResponse<T> = {
  data?: T;
  message: string;
  meta?: IMeta;
  statusCode: number;
  success: boolean;
};
export interface IReduxResponse<T> extends TResponse<T>, BaseQueryApi {}
