import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const addSalesPerson = async (userId, formData) => {
  const response = await axios.post(
    `${BASE_URL}/user/addUser/${userId}`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
