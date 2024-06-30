import { imageKey } from "@/constant/constant";
import axios from "axios";

// upload image to imagebb
const uploadImage = async (img: any) => {
  try {
    let formData = new FormData();
    formData.append("image", img);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imageKey}`,
      formData
    );
    let imageUrl = data?.data?.display_url;
    // let deleteUrl = data.data.delete_url;
    // return { imageUrl, deleteUrl };
    return imageUrl;
  } catch (error) {
    return null;
  }
};
export default uploadImage;
