import { IUser } from "@/types/global";
import { jwtDecode } from "jwt-decode";

const getDecodedToken = (token: string): IUser => {
  return jwtDecode(token);
};
export default getDecodedToken;
